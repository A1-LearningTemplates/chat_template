import React, { useEffect, useState, useRef } from "react";
import "./style.css";
import axios from "axios";
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
const Chat = ({
  setIsLogedIn,
  data,
  setNotification,
  notification,
  socket,
}) => {
  /* A state. */
  const [conversation, setConversation] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [online, setOnline] = useState([]);
  const [chatBox, setChatBox] = useState("");
  const [typing, setTyping] = useState(false);
  const [notificationRequest, setNotificationRequest] = useState(null);

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
    connectToSocket(setOnline, socket);
    getRequestedNotificationById();
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
  const updateConversation = (users) => {
    if (users.user1._id == data._id) {
      setConversation([...conversation, users.user1]);
    } else {
      setConversation([...conversation, users.user2]);
    }
  };
  useEffect(() => {
    receiveFromSocket({ event: "conversation", socket }, updateConversation);
  }, [conversation]);

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
                data &&
                user._id !== data._id && (
                  <Online
                    key={user._id}
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
