import "./style.css";
/* Importing the socket.io-client library. */
// import { io } from "socket.io-client";
import { useState } from "react";
// const socket = io("http://localhost:5000");

const Form = ({
  removeConvesetion,
  userData,
  message,
  setMessage,
  messages,
  sendMessage,
}) => {
  return (
    <div className="popup_form">
      <i
        className="close"
        onClick={() => {
          removeConvesetion(userData.id);
        }}
      >
        x<p>{userData.uName}</p>
      </i>
      <div className="chat_box">
        {messages.length &&
          messages.map((ele, index) => {
            return <p key={index}>{ele.message}</p>;
          })}
      </div>
      <form
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            sendMessage();
          }
        }}
        onSubmit={(e) => {
          sendMessage(e, userData.socket);
        }}
      >
        <input
          className="message_input"
          type="text"
          placeholder="Message...."
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <button className="message_btn">send</button>
      </form>
    </div>
  );
};

export default Form;
