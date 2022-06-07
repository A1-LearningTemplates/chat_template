const server = require("../index");
const socket = require("socket.io");

const io = socket(server, { cors: { origin: "http://localhost:3000" } });

io.on("connection", (socket) => {
  socket.on("message", (data) => {
    console.log(data);
  });
  console.log(`${socket.id} is connected`);
});
