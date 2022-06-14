import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
const socket = io("http://localhost:5000");
const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    socket.on("connect", () => {});

    return () => {
      socket.removeAllListeners();
    };
  }, []);
  socket.on("messageToClient", (data) => {
    setMessages([...messages, data]);
  });
  socket.on("ping", (data) => {
    console.log("ping was recived from the server");
  });
  socket.on("pong", (latency) => {
    console.log("latency", latency);
  });
  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit("message", { message: message });
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
      {messages.length &&
        messages.map((ele, index) => {
          return <p key={index}>{ele.message}</p>;
        })}
    </>
  );
};

export default Chat;
