const { chatNamespace } = require("../socket");
let sessionID = [];
const addSessionID = (id) => {
  sessionID.push(id);
};
const removeSessionID = (id) => {
  sessionID = sessionID.filter((ele) => {
    return ele.socket !== id;
  });
};
chatNamespace.on("connection", (socket) => {
  const data = {
    socket: socket.id,
    userName: socket.handshake.query.userName,
    _id: socket.handshake.query._id,
  };
  addSessionID(data);
  chatNamespace.emit("receivedConnection", sessionID);
  // socket.on("sendConnectedId", (data) => {
  //   addSessionID(data);
  // });

  socket.on("disconnect", () => {
    removeSessionID(socket.id);
    chatNamespace.emit("receivedDisconnect", sessionID);
  });
  socket.on("message", (dataMessage) => {
    chatNamespace
      .to([dataMessage.receiver.socket, socket.id])
      .emit("messageToClient", dataMessage);
  });
  socket.on("typing", (id) => {
    socket.to(id).emit("isTyping");
  });
  socket.on("send_new_conversation", (data) => {
    console.log(data);
    socket.to(data.socket).emit("get_new_conversation", data);
  });
});
// io.of("/Admin").on("connection", (socket) => {
//   socket.join("lvl1");
//   socket
//     .to("lvl1")
//     .emit("joined", { message: "I have joined the lvl1 room " + socket.id });
//   socket.emit("welcome", { socket: socket.id, from: "Admin" });
// });
