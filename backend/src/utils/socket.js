const socket = require("socket.io");
const initilizeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  io.on("connection", (socket) => {
    // events
    socket.on("joinChat", ({ userId, toUserId, firstName }) => {
      const roomId = [userId, toUserId].sort().join("_");
      console.log(firstName + " Joined :" + roomId);
      socket.join(roomId)
    });

    socket.on("sendMessage", ({userId, toUserId, firstName, newMessage}) => {
      const roomId = [userId, toUserId].sort().join("_");
      console.log(firstName + " Joined:" + roomId);
      console.log({firstName, newMessage});
      
      io.to(roomId).emit("messageRecieved", {
        firstName,
        newMessage,
      });
    });

    socket.on("disconnect", () => {});
  });
};

module.exports = initilizeSocket;
