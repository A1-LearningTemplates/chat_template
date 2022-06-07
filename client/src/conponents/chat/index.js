import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
const socket = io("http://localhost:5000");
const Chat = () => {
  const [message, setMessage] = useState("");
  useEffect(() => {
    socket.on("connection", () => {});
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit("message", message);
    setMessage("");
  };
  return (
    <form onSubmit={sendMessage}>
      <button>send</button>
      <input
        type="text"
        placeholder="Message...."
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />
    </form>
  );
};

export default Chat;
