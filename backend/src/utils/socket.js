const socket = require("socket.io");
const Chat = require("../models/chat");
const crypto = require("crypto")

const initilizeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  io.on("connection", (socket) => {
    try {
      // events
      socket.on("joinChat", ({ userId, toUserId, firstName, profilePhoto}) => {
        const roomId = crypto.createHash("sha256").update([userId, toUserId].sort().join("_")).digest("hex")
        // console.log(firstName + " Joined :" + roomId);
        socket.join(roomId);
      });

      socket.on(
        "sendMessage",
        async ({ userId, toUserId, firstName, text, profilePhoto }) => {
          let roomId = crypto.createHash("sha256").update([userId, toUserId].sort().join("_")).digest("hex")
          // console.log(firstName + " Joined: " + roomId);
          // console.log({ firstName, text });

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
            profilePhoto
          });
        }
      );

      socket.on("disconnect", () => {});
    } catch (err) {
      console.log(err.message);
    }
  });
};

module.exports = initilizeSocket;
