import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import Form from "../form/index";
import "./style.css";
// const socket2 = io("http://localhost:5000/Admin");

const Chat = ({ isLogedIn, setIsLogedIn, data }) => {
  const to = useRef(null);
  const socket = io("http://localhost:5000");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [online, setOnline] = useState([]);
  const [chatBox, setChatBox] = useState([]);

  useEffect(() => {
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
  }, []);
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
  // socket.on("messageToClient", (data) => {
  //   console.log(data);
  //   chatBox.filter((ele) => {
  //     if (ele.socket !== socket.id) {
  //       // setChatBox([...chatBox, ele]);
  //     }
  //   });
  //   console.log(data);
  //   setMessages([...messages, data]);
  // });

  // const sendMessage = (e, to) => {
  //   e.preventDefault();
  //   socket.emit("message", { message: message, to: to });
  //   setMessage("");
  // };
  const removeConvesetion = (id) => {
    const newChatBox = chatBox.filter((ele) => {
      return ele.id !== id;
    });
    setChatBox(newChatBox);
  };
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
                      to.current = ele.socket;
                      setChatBox([...chatBox, ele]);
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
        {chatBox.length &&
          chatBox.map((ele, index) => {
            return (
              <Form
                key={index}
                userData={ele}
                message={message}
                setMessage={setMessage}
                messages={messages}
                setMessages={setMessages}
                online={online}
                setOnline={setOnline}
                to={to}
                socket={socket}
                removeConvesetion={removeConvesetion}
                chatBox={chatBox}
                setChatBox={setChatBox}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Chat;
