import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import Form from "../form/index";
import "./style.css";
const socket2 = io("http://localhost:5000/Admin");

const Chat = ({ isLogedIn, setIsLogedIn, data }) => {
  const to = useRef(null);
  const socket = io("http://localhost:5000");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [online, setOnline] = useState([]);
  console.log(data);
  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("sendConnectedId", {
        socket: socket.id,
        uName: data.userName,
        id: data.id,
      });
    });
    return () => {
      socket.removeAllListeners();
      socket.close();
    };
  }, [isLogedIn]);
  // socket2.on("welcome", (data) => {
  //   console.log(data);
  // });
  // socket2.on("joined", (data) => {
  //   console.log(data);
  // });
  socket.on("receivedConnection", (data) => {
    setOnline(data);
  });
  socket.on("receivedDisconnect", (data) => {
    setOnline(data);
  });
  socket.on("messageToClient", (data) => {
    console.log(data);
    setMessages([...messages, data]);
  });

  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit("message", { message: message, to: to.current });
    setMessage("");
  };
  return (
    <div className="container">
      <div className="onlone_box">
        <h2>Online Users </h2>
        <div className="users_box">
          {online.length &&
            online.map((ele, index) => {
              return (
                <div
                  key={index}
                  className="users"
                  onClick={() => {
                    to.current = ele.socket;
                    console.log(to.current);
                  }}
                >
                  <img />
                  <span>{ele.uName}</span>
                </div>
              );
            })}
        </div>
      </div>
      <div className="form_box">
        <Form
          message={message}
          setMessage={setMessage}
          messages={messages}
          setMessages={setMessages}
          online={online}
          setOnline={setOnline}
          to={to}
          socket={socket}
          sendMessage={sendMessage}
        />
        <button
          onClick={() => {
            setIsLogedIn(false);
          }}
        >
          Logout
        </button>
        <h1>Chat APP</h1>
      </div>
    </div>
  );
};

export default Chat;
