const socket = require("socket.io");
const Chat = require("../models/chat");
const crypto = require("crypto");
const User = require("../models/user");
const ConnectionRequestModel = require("../models/connectionRequest");
const { error } = require("console");

const initilizeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  const activeUsers = new Map();

  io.on("connection", (socket) => {
    try {
      // events
      socket.on(
        "joinChat",
        async ({ userId, toUserId, firstName, profilePhoto }) => {
          // find to userId in Db
          console.log({ firstName, m: "Joined" });

          const toUser = await User.findById({ _id: toUserId });

          if (!toUser) {
            socket.emit("userNotFound", {
              error: {
                status: 404,
                message: "User not found",
              },
            });
            return;
          }

          // Search is user and toUser have connection request with interested status
          const connection = await ConnectionRequestModel.findOne({
            $or: [
              { fromUserId: userId, toUserId },
              { fromUserId: toUserId, toUserId: userId },
            ],
            status: "accepted",
          });

          if (!connection) {
            socket.emit("unAuthorizedConnection", {
              error: {
                status: 401,
                message: "Connection is unauthorized",
              },
            });
          }

          // search
          const roomId = crypto
            .createHash("sha256")
            .update([userId, toUserId].sort().join("_"))
            .digest("hex");
          
          io.to(roomId).emit("")

          socket.join(roomId);
        }
      );

      socket.on(
        "sendMessage",
        async ({ userId, toUserId, firstName, text, profilePhoto }) => {
          const toUser = await User.findById({ _id: toUserId });
          console.log({ userId, toUserId, firstName, text, profilePhoto });

          if (!toUser) return;

          // Search is user and toUser have connection request with interested status
          const connection = await ConnectionRequestModel.findOne({
            $or: [
              { fromUserId: userId, toUserId },
              { fromUserId: toUserId, toUserId: userId },
            ],
            status: "accepted",
          });

          if (!connection) return;

          let roomId = crypto
            .createHash("sha256")
            .update([userId, toUserId].sort().join("_"))
            .digest("hex");

          let chat = await Chat.findOne({
            participants: { $all: [userId, toUserId] },
          });

          if (!chat) {
            chat = new Chat({
              participants: [userId, toUserId],
              messages: [],
            });
          }

          chat.messages.push({ senderId: userId, text });
          await chat.save();

          io.to(roomId).emit("messageRecieved", {
            firstName,
            text,
            profilePhoto,
          });
        }
      );

      socket.on("ping", ({ userId, toUserId, firstName, status }) => {
        const roomId = crypto
          .createHash("sha256")
          .update([userId, toUserId].sort().join("_"))
          .digest("hex");

        activeUsers.set(userId, { roomId, lastPing: Date.now(), firstName, status });

      });

      const timer = setInterval(() => {
        const now = Date.now();
        for (let [userId, user] of activeUsers.entries()) {
          if (now - user.lastPing > 15000) {
            io.to(user.roomId).emit("userLeft", {
              userId,
              message: "user left the chat room.",
              status: !user.status
            });
            activeUsers.delete(userId);
          } else {
            io.to(user.roomId).emit("online", {
              userId,
              message: "User is online",
              status: user.status
            })
          }
        }
      }, 10000);

      socket.on("disconnect", () => {
        clearInterval(timer);
      });
    } catch (err) {
      console.log(err.message);
    }
  });
};

module.exports = initilizeSocket;
