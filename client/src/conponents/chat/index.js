import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
const socket = io("http://localhost:5000");
const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [clientData, setclientData] = useState(null);
  const allMessages = [];
  useEffect(() => {
    console.log(socket);
    socket.on("connect", (data) => {
      socket.on("message", (data) => {
        console.log(data);
      });
    });
    return () => socket.emit("disconnect", clientData);
  }, []);
  console.log(messages);
  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit("message", { message: message, id: socket.id });
    allMessages.push({ message: message, id: socket.id });
    setMessages(allMessages);
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
