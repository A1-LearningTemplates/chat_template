import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";
const Notification = ({ data, notification, setNotification }) => {
  const [show, setShow] = useState(true);
  const getNotification = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/notification/received?user_id=${data._id}`
      );
      if (res.data.success) {
        setNotification(res.data.notification);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNotification();
  }, []);

  useEffect(() => {
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
          return (
            <div
              className={`conversation_user notification_user ${
                show && "show"
              }`}
              key={index}
              onClick={() => {
                let user = ele.person;
                // const newData = online.map((on) => {
                //   if (on._id === user._id) {
                //     user.socket = on.socket;
                //     on.newMessage = [];
                //     return on;
                //   }
                //   return on;
                // });
                // setOnline(newData);
                // setChatBox(user);
                // getAllMessages(user._id);
              }}
            >
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
