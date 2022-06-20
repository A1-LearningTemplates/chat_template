
import { io } from "socket.io-client";
const socket = io("http://localhost:5000");

const Form = ({ message, setMessage, messages, sendMessage }) => {
  console.log(messages);
  return (
    <div className="popup_form">
      <form onSubmit={sendMessage}>
        <button>send</button>
        <input
          type="text"
          placeholder="Message...."
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
      </form>
      <div className="chat_box">
        {messages &&
          messages.map((ele, index) => {
            return <p key={index}>{ele.message}</p>;
          })}
      </div>
    </div>
  );
};

export default Form;
