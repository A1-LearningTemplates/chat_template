let sessionID = [];
const addSessionID = (id) => {
  sessionID.push(id);
};
const removeSessionID = (id) => {
  sessionID = sessionID.filter((ele) => {
    return ele.socket !== id;
  });
};
const chatConnection = (socket, io) => {
  const data = {
    socket: socket.id,
    userName: socket.handshake.query.userName,
    _id: socket.handshake.query._id,
    newMessage: [],
  };
  addSessionID(data);

  console.log(sessionID);
  io.emit("receivedConnection", sessionID);

  socket.on("disconnect", () => {
    removeSessionID(socket.id);
    io.emit("receivedDisconnect", sessionID);
  });
  socket.on("message", (dataMessage) => {
    io.to([dataMessage.receiver.socket, socket.id]).emit(
      "messageToClient",
      dataMessage
    );
  });
  socket.on("typing", (id) => {
    socket.to(id).emit("isTyping");
  });
  socket.on("conv_state", (data) => {
    console.log(data);
    socket.to(data.socket_id).emit("conv", data);
  });

  socket.on("test", (data) => {
    console.log("from test", data);
    io.to([socket.id]).emit("test", data);
  });
};

module.exports = { chatConnection };
