// node express server
const server = require("../index");
// socket.io is a third party
const socketio = require("socket.io");
// creating socketio connection using node server to the cliebt server
const io = socketio(server, { cors: { origin: "http://localhost:3000" } });
const sessionID = [];
io.on("connection", (socket, req) => {
  const data = {
    id: socket.id,
    index: sessionID.length,
  };
  sessionID.push(data);
  console.log(sessionID);
  socket.on("disconnect", (data) => {
    sessionID.splice(data.index, 1);
    console.log(sessionID);
  });

  socket.on("message", (data) => {
    console.log(data);
    socket.broadcast.emit("message", data);
  });
});




