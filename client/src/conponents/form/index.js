import { io } from "socket.io-client";
import "./style.css";
const Form = ({ message, setMessage, messages, sendMessage }) => {
  console.log(messages);
  return (
    <div className="popup_form">
      <div className="chat_box">
        {messages.length &&
          messages.map((ele, index) => {
            return <p key={index}>{ele.message}</p>;
          })}
      </div>
      <form onSubmit={sendMessage}>
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
