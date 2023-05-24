import React, { useEffect, useState, useRef } from "react";
import "./style.css";
import axios from "axios";
import { io } from "socket.io-client";
import Form from "../form/index";
import Conversation from "../conversation";
import {
  connectToSocket,
  disconnectFromSocket,
  isTypingReceive,
  receiveFromSocket,
  sendToSocket,
} from "../../socketFunctions";
import Online from "../online";
//---------------------------------------------
/* A function that takes in three parameters. */
const Chat = ({ setIsLogedIn, data, setNotification, notification }) => {
  /* A state. */
  const [test, setTest] = useState("");
  const [conversation, setConversation] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [online, setOnline] = useState([]);
  const [chatBox, setChatBox] = useState("");
  const [typing, setTyping] = useState(false);
  const [notificationRequest, setNotificationRequest] = useState(null);
  const [socket, setsocket] = useState(
    io("http://localhost:5000", {
      query: {
        userName: data.userName,
        _id: data._id,
        /**here it is possible to send client information when connecting */
      },
      autoConnect: false,
      // reconnection: false,
    })
  );
  //---------------------------------------------
  /* Connecting to the socket and sending the data to the server. */
  const getRequestedNotificationById = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/notification/sended?user_id=${data._id}`
      );
      if (res.data.success) {
        setNotificationRequest(res.data.notification);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRequestedNotificationById();
    connectToSocket(setOnline, socket);
    return () => {
      disconnectFromSocket(socket);
    };
  }, []);

  useEffect(() => {
    let time;
    isTypingReceive(setTyping, socket, time);

    return () => {
      clearTimeout(time);
    };
  }, [typing]);

  const showMessage = (data) => {
    if (chatBox._id === data.sender._id || chatBox._id === data.receiver._id) {
      const arr = [...messages, data];
      setMessages(arr);
    } else {
      const onlineUpdate = online.map((user) => {
        console.log(user);
        if (user._id === data.sender._id) {
          user.newMessage.push(data.message);
          return user;
        }
        return user;
      });
      setOnline(onlineUpdate);
    }
  };
  useEffect(() => {
    //---------------------------------------------
    /* Listening to the socket and updating the state. */
    receiveFromSocket({ event: "messageToClient", socket }, showMessage);
  }, [messages]);
  useEffect(() => {
    //---------------------------------------------
    /* Listening to the socket and updating the state. */
    receiveFromSocket({ event: "notification", socket }, setNotification);
  }, [notification]);
  const sendNotification = (newNotification) => {
    sendToSocket({ event: "notification", socket, data: newNotification });
  };
  const isTyping = () => {
    sendToSocket({ event: "typing", socket, data: chatBox.socket });
  };
  //---------------------------------------------
  /**
   * It sends a message to the server, which then sends it to the other user.
   * @param e - the event object
   */
  const sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      const newData = {
        message: message,
        createdAt: new Date(),
        receiver: chatBox,
        sender: data,
      };
      sendToSocket({ event: "message", socket, data: newData });
      setMessage("");
      createMessage(message, chatBox.conversation);
    }
  };

  //---------------------------------------------
  /**
   * It takes in an id, and then it makes a post request to the server, sending the id of the current
   * user and the id of the user that the current user wants to message
   * @param id - the id of the person you want to create a conversation with
   */
  const updateConversation = async (user) => {
    // conversationState({ socket_id: user.socket, ...data });
    const existed = conversation?.find((elem) => {
      return elem.person._id === user._id;
    });

    if (existed) {
      setChatBox(user);
      getAllMessages(user._id);
      return;
    }
    try {
      const res = await axios.put(`http://localhost:5000/conversation`, {
        person: user._id,
        user_id: data._id,
      });
      console.log(res);

      if (res.data.success) {
        const person = {
          person: res.data.data,
        };
        console.log(person);
        setConversation([...conversation, person]);
        setChatBox(user);
        getAllMessages(user._id);
        // conversationState({ user, data });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const conversationState = (data) => {
  //   socket.emit("conv_state", data);
  // };
  //---------------------------------------------
  /**
   * It's an async function that makes a GET request to the server, and if the response is successful,
   * it logs the response to the console.
   * @param id - the id of the user that is logged in
   */
  const getAllMessages = async (receiver) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/message/?receiver=${receiver}&sender=${data._id}`
      );
      if (res) {
        setMessages(res.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  //---------------------------------------------
  /**
   * It takes an id as an argument and then uses that id to create a new message in the database.
   * @param id - the id of the conversation
   */
  const createMessage = async (message) => {
    try {
      const res = await axios.post(`http://localhost:5000/message/`, {
        message,
        sender: data._id,
        receiver: chatBox._id,
      });
      if (res) {
      }
    } catch (error) {
      console.error(error);
    }
  };

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
          {online.length ? (
            online.map((user, index) => {
              return (
                user._id !== data._id && (
                  <Online
                  key={user._id }
                    notificationRequest={notificationRequest}
                    user={user}
                    data={data}
                    sendNotification={sendNotification}
                  />
                )
              );
            })
          ) : (
            <small>Wait for some people to be online..</small>
          )}
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
          getAllMessages={getAllMessages}
          setOnline={setOnline}
        />
      </div>
      <div className="chat_form_box">
        {chatBox && (
          <Form
            data={data}
            typing={typing}
            isTyping={isTyping}
            chatBox={chatBox}
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
