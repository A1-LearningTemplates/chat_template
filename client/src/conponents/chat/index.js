import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import Form from "../form/index";
import "./style.css";
// const socket2 = io("http://localhost:5000/Admin");
// const socket = io("http://localhost:5000");

const Chat = ({ isLogedIn, setIsLogedIn, data }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [online, setOnline] = useState([]);
  const [chatBox, setChatBox] = useState();
  const [socket, setsocket] = useState(io("http://localhost:5000"));
  useEffect(() => {
    socket.connect();
    if (data) {
    socket.on("connect", () => {
      socket.emit("sendConnectedId", {
        socket: socket.id,
        uName: data.userName,
        id: data.id,
      });
    });
    }

    return () => {
      socket.removeAllListeners();
      socket.close();
    };
  }, [socket]);
  // socket2.on("welcome", (data) => {
  //   console.log(data);
  // });
  // socket2.on("joined", (data) => {
  //   console.log(data);
  // });
  socket.on("receivedConnection", (data) => {
    if (chatBox) {
      const newdata = data.filter((ele) => {
        console.log(ele);
        return ele.id === chatBox.id;
      });
      setChatBox(...newdata);
    }
    setOnline(data);
  });
  socket.on("receivedDisconnect", (data) => {
    if (chatBox) {
      const newdata = data.filter((ele) => {
        if (ele.id !== chatBox.id) {
          setChatBox({ ...chatBox, connected: false });
        }
      });
    }
    setOnline(data);
  });
  socket.on("messageToClient", (data) => {
    const arr = [...messages, data];
    setMessages(arr);
  });

  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit("message", { message: message, to: chatBox.socket });
    setMessage("");
  };
  // const removeConvesetion = (id) => {
  //   const newChatBox = chatBox.filter((ele) => {
  //     return ele.id !== id;
  //   });
  //   setChatBox(newChatBox);
  // };
  return (
    <div className="container">
      <div className="onlone_box">
        <h2>Online Users </h2>
        <button
          onClick={() => {
            setIsLogedIn(false);
            localStorage.clear();
          }}
        >
          Logout
        </button>
        <div className="users_box">
          {online.length &&
            online.map((ele, index) => {
              return (
                <div
                  key={index}
                  className="users"
                  onClick={() => {
                    if (ele.id !== data.id) {
                      setChatBox(ele);
                    }
                  }}
                >
                  <img />
                  <span>{ele.uName}</span>
                </div>
              );
            })}
        </div>
      </div>
      <div className="chat_form_box">
        {chatBox && (
          <Form
            userData={chatBox}
            sendMessage={sendMessage}
            message={message}
            setMessage={setMessage}
            messages={messages}
          />
        )}
      </div>
    </div>
  );
};

export default Chat;
