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
  // console.log(socket.handshake.query.userName);
  // addSessionID(data);
  const data = {
    socket: socket.id,
    userName: socket.handshake.query.userName,
    id: socket.handshake.query.id,
  };
  addSessionID(data);

    io.emit("receivedConnection", sessionID);
  // socket.on("sendConnectedId", (data) => {
  //   addSessionID(data);
  // });

  socket.on("disconnect", () => {
    removeSessionID(socket.id);
    io.emit("receivedDisconnect", sessionID);
  });
  socket.on("message", (dataMessage) => {
    io.to([dataMessage.chatBox.socket, socket.id]).emit(
      "messageToClient",
      dataMessage
    );
  });
  socket.on("typing", (id, func) => {
    socket.to(id).emit("isTyping");
  });
});
// io.of("/Admin").on("connection", (socket) => {
//   socket.join("lvl1");
//   socket
//     .to("lvl1")
//     .emit("joined", { message: "I have joined the lvl1 room " + socket.id });
//   socket.emit("welcome", { socket: socket.id, from: "Admin" });
// });
