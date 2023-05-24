import axios from "axios";
import React, { useEffect, useState } from "react";

const Online = ({ user, data, sendNotification, notificationRequest }) => {
  const createNotification = async () => {
    try {
      const res = await axios.post(`http://localhost:5000/notification/`, {
        sender: data._id,
        receiver: user._id,
      });
      if (res.data.success) {
        console.log(res.data);
        sendNotification(user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      key={user._id}
      className="users"
      onClick={() => {
        // createNotification(user);
        sendNotification(user);
      }}
    >
      <img src="https://previews.123rf.com/images/metelsky/metelsky1809/metelsky180900233/109815470-man-avatar-profile-male-face-icon-vector-illustration-.jpg" />
      <div>
        <p>{user.userName}</p>
        <small>
          online
          {user.newMessage.length > 0 && (
            <span className="new_message">{user.newMessage.length}</span>
          )}
        </small>
      </div>
      {notificationRequest?.some((ele) => ele._id === user._id) && (
        <div className="user_requested">
          <small>Waiting</small>
        </div>
      )}
    </div>
  );
};

export default Online;
