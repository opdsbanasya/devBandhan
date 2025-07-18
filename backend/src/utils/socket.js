const socket = require("socket.io");
const initilizeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:5137",
    },
  });

  io.on("connection", (socket) => {
    // events
    socket.on("joinChat", () => {});
    socket.on("sendMessage", () => {});
    socket.on("disconnect", () => {});
  });
};

module.exports = initilizeSocket;