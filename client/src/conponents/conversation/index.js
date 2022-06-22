import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";
const Conversation = ({ data, setChatBox, online, setMessages }) => {
  const [conversation, setConversation] = useState([]);
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
        console.log(res);
        setConversation(res.data.data);
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
  const getAllMessages = async (id) => {
    try {
      const res = await axios.get(`http://localhost:5000/message/${id}`);
      if (res) {
        console.log(res);
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
        {conversation &&
          conversation.map((ele, index) => {
            if (ele.person_one !== null || ele.person_two !== null) {
              return (
                <div
                  className="conversation_user"
                  key={index}
                  onClick={() => {
                    getAllMessages(ele._id);
                    let user = ele.person_two ? ele.person_two : ele.person_one;
                    online.map((on) => {
                      if (on.id === user._id) {
                        user.socket = on.socket;
                        user.conversation = ele._id;
                      }
                    });
                    console.log(user);
                    setChatBox(user);
                  }}
                >
                  <span className="user_name">
                    {ele.person_two
                      ? ele.person_two.userName
                      : ele.person_one.userName}
                  </span>
                </div>
              );
            }
          })}
      </div>
    </div>
  );
};

export default Conversation;
