import React, { useEffect, useState, useRef } from "react";
import "./style.css";
import axios from "axios";
import { io } from "socket.io-client";
import Form from "../form/index";
import Conversation from "../conversation";
// const socket2 = io("http://localhost:5000/Admin");
// const socket = io("http://localhost:5000");
//---------------------------------------------

/* A function that takes in three parameters. */
const Chat = ({ setIsLogedIn, data }) => {
  /* A state. */
  const [conversation, setConversation] = useState([]);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [online, setOnline] = useState([]);
  const [chatBox, setChatBox] = useState();
  // const [socket, setsocket] = useState(io("http://localhost:5000"));
  const server = useRef(io("http://localhost:5000"));
  const socket = server.current;
  //---------------------------------------------
  /* Connecting to the socket and sending the data to the server. */
  useEffect(() => {
    socket.connect();
    if (data) {
      socket.on("connect", () => {
        console.log(socket.id);
        socket.emit("sendConnectedId", {
          socket: socket.id,
          userName: data.userName,
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
  //---------------------------------------------
  /* Listening to the socket and updating the state. */
  socket.on("receivedConnection", (data) => {
    if (chatBox) {
      const newdata = data.filter((ele) => {
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
  socket.on("messageToClient", (dataMessage) => {
    if (chatBox && chatBox.id === dataMessage.chatBox.id) {
      const arr = [...messages, dataMessage];
      setMessages(arr);
    } else {
    }
  });

  //---------------------------------------------
  /**
   * It sends a message to the server, which then sends it to the other user.
   * @param e - the event object
   */
  const sendMessage = (e) => {
    console.log(chatBox);

    e.preventDefault();
    socket.emit("message", { message: message, chatBox });
    setMessage("");
    createMessage(message, chatBox.conversation);
  };
  //---------------------------------------------
  /**
   * It takes in an id, and then it makes a post request to the server, sending the id of the current
   * user and the id of the user that the current user wants to message
   * @param id - the id of the person you want to create a conversation with
   */
  const createNewConversation = async (user) => {
    try {
      const res = await axios.post(`http://localhost:5000/conversation`, {
        person_one: data.id,
        person_two: user.id,
      });
      if (res) {
        if (res.data.status == 201) {
          setConversation([...conversation, res.data.data]);
          user.conversation = res.data.data.conversation;
          setChatBox(user);
          console.log(res.data.data);
        } else {
          user.conversation = res.data.data[0].conversation_id;
          setChatBox(user);
          setMessages(res.data.data);
          console.log(res.data.data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(chatBox);

  //---------------------------------------------
  /**
   * It takes an id as an argument and then uses that id to create a new message in the database.
   * @param id - the id of the conversation
   */
  console.log(data);
  const createMessage = async (message, conversation_id) => {
    try {
      const res = await axios.post(`http://localhost:5000/message/`, {
        message,
        conversation_id,
        sender: data.id,
      });
      if (res) {
      }
    } catch (error) {
      console.log(error);
    }
  };

  //---------------------------------------------
  // const removeConvesetion = (id) => {
  //   const newChatBox = chatBox.filter((ele) => {
  //     return ele.id !== id;
  //   });
  //   setChatBox(newChatBox);
  // };

  //---------------------------------------------
  /* It's calling the function `getAllConversation` when the component mounts. */

  //---------------------------------------------
  return (
    <div className="container">
      <div className="onlone_box">
        <button
          className="logout_btn"
          onClick={() => {
            setIsLogedIn(false);
            localStorage.clear();
          }}
        >
          Logout
        </button>
        <h2>Online Users </h2>
        <div className="users_box">
          {online.length &&
            online.map((ele, index) => {
              return (
                <div
                  key={index}
                  className="users"
                  onClick={() => {
                    if (ele.id !== data.id) {
                      createNewConversation(ele);
                    }
                  }}
                >
                  <img src="https://previews.123rf.com/images/metelsky/metelsky1809/metelsky180900233/109815470-man-avatar-profile-male-face-icon-vector-illustration-.jpg" />
                  <div>
                    <p>
                      {ele.userName} {ele.id === data.id && <span>: Me</span>}
                    </p>
                    <small>online</small>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <div className="conversation">
        <Conversation
          setMessages={setMessages}
          online={online}
          setChatBox={setChatBox}
          data={data}
          conversation={conversation}
          setConversation={setConversation}
        />
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
