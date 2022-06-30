import "./style.css";
import Text from "./Text";
const Form = ({ message, setMessage, messages, sendMessage, chatBox }) => {
  return (
    <div className="popup_form">
      <Text chatBox={chatBox} />

      <div className="chat_box">
        {messages.length &&
          messages.map((ele, index) => {
            console.log(ele);
            return (
              <div key={index}>
                {/* <img src="https://previews.123rf.com/images/metelsky/metelsky1809/metelsky180900233/109815470-man-avatar-profile-male-face-icon-vector-illustration-.jpg" /> */}
                <small>{ele.sender ? ele.sender : ele.sender.userName}</small>
                <p>{ele.message}</p>
              </div>
            );
          })}
      </div>
      <form
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            sendMessage(e);
          }
        }}
        onSubmit={(e) => {
          sendMessage(e);
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
      </form>
    </div>
  );
};

export default Form;
