import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "./style.css";
const socket = io("http://localhost:5000");
const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [online, setOnline] = useState([]);
  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("sendConnectedId", { socket: socket.id });
    });
    return () => {
      socket.on("disconnect", () => {});
      socket.removeAllListeners();
    };
  }, []);
  socket.on("receivedConnection", (data) => {
    setOnline(data);
  });
  socket.on("receivedDisconnect", (data) => {
    setOnline(data);
  });
  socket.on("messageToClient", (data) => {
    setMessages([...messages, data]);
  });

  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit("message", { message: message });
    setMessage("");
  };
  console.log(online);
  return (
    <div className="container">
      <div className="form_box">
        <h1>Chat APP</h1>
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
        <div className="chat_box">
          {messages.length &&
            messages.map((ele, index) => {
              return <p key={index}>{ele.message}</p>;
            })}
        </div>
      </div>
      <div className="onlone_box">
        <h2>Online Users </h2>
        {online.length &&
          online.map((ele) => {
            return (
              <div className="users">
                <img />
                <span>{ele.socket}</span>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Chat;
