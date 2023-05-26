import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";
import { sendToSocket } from "../../socketFunctions";
const Notification = ({ data, notification, setNotification, socket }) => {
  const [show, setShow] = useState(true);
  const getNotification = async () => {
    console.log(data._id);
    try {
      const res = await axios.get(
        `http://localhost:5000/notification/received?user_id=${data._id}`
      );
      if (res.data.success) {
        console.log("ssss",res.data.notification);
        setNotification(res.data.notification);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //---------------------------------------------
  const updateConversation = async (user) => {
    console.log( user.sender._id,data._id);
    try {
      const res = await axios.put(
        `http://localhost:5000/conversation/${user._id}`,
        {
          person: user.sender._id,
          user_id: data._id,
        }
      );

      if (res.data.success) {
        const afterFilter = notification.filter((ele) => ele._id != user._id);
        setNotification(afterFilter);
        sendToSocket({
          event: "conversation",
          socket,
          data: { user1: user.sender, user2: data },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!notification) {
      console.log(5545);
      getNotification();
    }
  }, []);

  useEffect(() => {
    console.log(true);
    setShow(true);
    const id = setTimeout(() => {
      setShow(false);
    }, 3000);

    return () => {
      clearTimeout(id);
    };
  }, [notification]);

  return (
    <div className="notification_container">
      <div className="conversation_box notification_box" id="notification_box">
        <h3>Notification</h3>
      </div>
      <div className="conversation_users">
        {notification?.map((ele, index) => {
          console.log(ele);
          return (
            <div
              className={`conversation_user notification_user ${
                show && "show"
              }`}
              key={ele._id}
            >
              <div
                onClick={() => {
                  updateConversation(ele);
                }}
                className="icon_slider"
              >
                <img src="/icons8-accept-48.png" />
              </div>
              <img src="https://previews.123rf.com/images/metelsky/metelsky1809/metelsky180900233/109815470-man-avatar-profile-male-face-icon-vector-illustration-.jpg" />
              <span className="user_name">{ele.sender?.userName}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Notification;
