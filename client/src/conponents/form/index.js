import "./style.css";

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
      <div className="chat_box">
        {messages.length &&
          messages.map((ele, index) => {
            return <p key={index}>{ele.message}</p>;
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
