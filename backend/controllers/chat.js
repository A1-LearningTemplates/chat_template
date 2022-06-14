// node express server
const server = require("../index");
// socket.io is a third party
const socketio = require("socket.io");
// creating socketio connection using node server to the cliebt server
const io = socketio(server, { cors: { origin: "http://localhost:3000" } });

let sessionID = [];
const addSessionID = (id) => {
  sessionID.push(id);
  console.log(sessionID);
};
const removeSessionID = (id) => {
  sessionID = sessionID.filter((ele) => {
    return ele !== id;
  });
  console.log(sessionID);
};
io.on("connection", (socket, req) => {
  addSessionID(socket.id);
  socket.on("disconnect", (data) => {
    removeSessionID(socket.id);
  });

  socket.on("message", (data) => {
    console.log(data);
    io.emit("messageToClient", data);
  });
});
