const connectToSocket = (setState, socket) => {
  socket.connect();
  socket.on("receivedConnection", (data) => {
    setState(data);
  });
  socket.on("receivedDisconnect", (data) => {
    setState(data);
  });
};
const disconnectFromSocket = (socket) => {
  socket.removeAllListeners();
  socket.close();
};
const isTypingReceive = (setState, socket, time) => {
  socket.on("isTyping", () => {
    clearTimeout(time);
    setState(true);
    time = setTimeout(() => {
      setState(false);
    }, 2000);
  });
};

const receiveFromSocket = ({ event, socket }, setState) => {
  socket.on(event, (receivedData) => {
console.log("receivedData");
    setState((prev) => [...prev, receivedData]);
  });
};
const sendToSocket = ({ event, socket, data }) => {
  socket.emit(event, data);
};

export {
  connectToSocket,
  disconnectFromSocket,
  isTypingReceive,
  receiveFromSocket,
  sendToSocket,
};
