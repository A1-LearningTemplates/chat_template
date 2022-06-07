import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
const socket = io("http://localhost:5000");
const Chat = () => {
  const [message, setMessage] = useState("");
  const [clientData, setclientData] = useState(null);
  useEffect(() => {
    socket.on("connected", (data) => {
      setclientData(data);
    });
    return () => socket.emit("disconnect", clientData);
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit("message", message);
    setMessage("");
  };
  return (
    <>
      <div>
        <h1>Chat APP</h1>
      </div>
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
    </>
  );
};

export default Chat;
