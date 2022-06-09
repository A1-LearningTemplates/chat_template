const server = require("../index");
const socket = require("socket.io");

const io = socket(server, { cors: { origin: "http://localhost:3000" } });
const sessionID = [];
io.on("connection", (socket) => {
  const data = {
    id: socket.id,
    index: sessionID.length,
  };
  sessionID.push(data);
  console.log(data);
  socket.emit("connected", data);
  socket.on("disconnect", (data) => {
    sessionID.splice(data.index, 1);
  });

  socket.on("message", (data) => {
    console.log(data);
  });
});
