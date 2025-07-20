const socket = require("socket.io");
const Chat = require("../models/chat");
const initilizeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  io.on("connection", (socket) => {
    try {
      // events
      socket.on("joinChat", ({ userId, toUserId, firstName }) => {
        const roomId = [userId, toUserId].sort().join("_");
        console.log(firstName + " Joined :" + roomId);
        socket.join(roomId);
      });

      socket.on(
        "sendMessage",
        async ({ userId, toUserId, firstName, text, profilePhoto }) => {
          const roomId = [userId, toUserId].sort().join("_");
          console.log(firstName + " Joined: " + roomId);
          console.log({ firstName, text });

          let chat = await Chat.findOne({
            participants: { $all: [userId, toUserId] },
          });
          console.log(chat);

          if (!chat) {
            chat = new Chat({
              participants: [userId, toUserId],
              messages: [],
            });
          }
          chat.messages.push({ senderId: userId, text, profilePhoto });
          await chat.save();

          io.to(roomId).emit("messageRecieved", {
            firstName,
            text,
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
