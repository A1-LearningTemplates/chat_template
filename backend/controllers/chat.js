// node express server
const server = require("../index");
// socket.io is a third party
const socketio = require("socket.io");
// creating socketio connection using node server to the cliebt server
const io = socketio(server, { cors: { origin: "http://localhost:3000" } });

let sessionID = [];
const addSessionID = (id) => {
  sessionID.push(id);
};
const removeSessionID = (id) => {
  sessionID = sessionID.filter((ele) => {
    return ele.socket !== id;
  });
};
io.on("connection", (socket) => {
  socket.on("sendConnectedId", (data) => {
    addSessionID(data);
    io.emit("receivedConnection", sessionID);
    console.log(sessionID);
  });

  socket.on("disconnect", () => {
    removeSessionID(socket.id);
    io.emit("receivedDisconnect", sessionID);
    console.log(sessionID);

  });
  socket.on("message", (data) => {
    io.emit("messageToClient", data);
  });
});
// io.of("/Admin").on("connection", (socket) => {
//   socket.join("lvl1");
//   socket
//     .to("lvl1")
//     .emit("joined", { message: "I have joined the lvl1 room " + socket.id });
//   socket.emit("welcome", { socket: socket.id, from: "Admin" });
// });
