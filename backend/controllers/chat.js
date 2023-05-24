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

  io.emit("receivedConnection", sessionID);

  socket.on("disconnect", () => {
    removeSessionID(socket.id);
    io.emit("receivedDisconnect", sessionID);
  });
  socket.on("message", (dataMessage) => {
    console.log(dataMessage);
    io.to([dataMessage.receiver.socket, socket.id]).emit(
      "messageToClient",
      dataMessage
    );
  });
  socket.on("typing", (id) => {
    socket.to(id).emit("isTyping");
  });
  //edit
  socket.on("conv_state", (data) => {
    socket.to(data.socket_id).emit("conv", data);
  });

  socket.on("notification", (data) => {
    console.log(data);
    socket.to(data.socket).emit("notification", data);
  });
};

module.exports = { chatConnection };
