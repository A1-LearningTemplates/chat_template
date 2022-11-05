import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";
const Conversation = ({
  data,
  setChatBox,
  online,
  setMessages,
  conversation,
  setConversation,
}) => {
  //---------------------------------------------
  /**
   * It's an async function that makes a GET request to the server and returns the response.
   */
  const getAllConversation = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/conversation/${data.id}`
      );
      if (res) {
        setConversation(res.data.data.persons);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //---------------------------------------------
  /**
   * It's an async function that makes a GET request to the server, and if the response is successful,
   * it logs the response to the console.
   * @param id - the id of the user that is logged in
   */
  const getAllMessages = async (receiver) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/message/?receiver=${receiver}&sender=${data.id}`
      );
      if (res) {
        setMessages(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllConversation();
  }, []);
  return (
    <div className="conversation_box">
      <h3>Conversation</h3>
      <div className="conversation_users">
        {conversation?.map((ele, index) => {
          return (
            <div
              className="conversation_user"
              key={index}
              onClick={() => {
                let user = ele.person;
                online.map((on) => {
                  if (on.id === user._id) {
                    user.socket = on.socket;
                  }
                });
                setChatBox(user);
                getAllMessages(user._id);
              }}
            >
              <img src="https://previews.123rf.com/images/metelsky/metelsky1809/metelsky180900233/109815470-man-avatar-profile-male-face-icon-vector-illustration-.jpg" />
              <span className="user_name">{ele.person.userName}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Conversation;
