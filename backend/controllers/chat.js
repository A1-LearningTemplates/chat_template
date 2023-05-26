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
    io.to([dataMessage.receiver.socket, socket.id]).emit(
      "messageToClient",
      dataMessage
    );
  });
  socket.on("typing", (id) => {
    socket.to(id).emit("isTyping");
  });
  //edit
  socket.on("conversation", (data) => {
    const id = sessionID.find((ele) => {
      return ele._id === data.user1._id;
    });
    console.log("ASDASD",id,data);
    io.to([socket.id, id.socket]).emit("conversation", data);
  });

  socket.on("notification", (data) => {
    console.log(data);
    socket.to(data.sender.socket).emit("notification", data);
  });
};

module.exports = { chatConnection };
