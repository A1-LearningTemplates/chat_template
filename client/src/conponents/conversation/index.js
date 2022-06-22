import React, { useEffect, useState } from "react";
import axios from "axios";

const Conversation = ({ data, setChatBox }) => {
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
        console.log(res.data.data);
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
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllConversation();
  }, []);
  return (
    <div>
      <h3>Conversation</h3>
      <div>
        {conversation &&
          conversation.map((ele, index) => {
            if (ele.person_one !== null || ele.person_two !== null) {
              return (
                <div
                  key={index}
                  onClick={() => {
                    getAllMessages(ele._id);
                    let user = ele.person_two ? ele.person_two : ele.person_one;
                    setChatBox(user);
                  }}
                >
                  <span>
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
