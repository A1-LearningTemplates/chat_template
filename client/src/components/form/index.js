import "./style.css";
import Text from "./Text";
import * as timeago from "timeago.js";
import { useEffect, useRef } from "react";
const Form = ({
  message,
  setMessage,
  messages,
  sendMessage,
  chatBox,
  data,
  isTyping,
  typing,
}) => {
  const scrollRef = useRef(null);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        behavior: "smooth",
        top: scrollRef.current.scrollHeight,
      });
    }
  }, [messages]);

  return (
    <div className="popup_form">
      <Text chatBox={chatBox} />

      <div ref={scrollRef} className="chat_box">
        {messages.length
          ? messages.map((ele, index) => {
              console.log(ele);
              return (
                <div key={index} className="sende_box">
                  <span
                    className={
                      ele.sender._id === data.id
                        ? "sender_green sender"
                        : "sender_red sender"
                    }
                  >
                    {(index === 0 ||
                      ele.sender.userName !==
                        messages[index - 1].sender.userName) &&
                      ele.sender.userName}
                  </span>
                  <p
                    className={
                      ele.sender._id === data.id
                        ? "message_green message"
                        : "message_red message"
                    }
                  >
                    {ele.message}
                    <small className="createdAt">
                      {timeago.format(ele.createdAt)}
                    </small>
                  </p>
                </div>
              );
            })
          : null}
      </div>
      <form
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            sendMessage(e);
          }
        }}
      >
        <small className="isTyping" style={{ opacity: typing ? "1" : "0" }}>
          {chatBox.userName} isTyping ...
        </small>
        <input
          className="message_input"
          type="text"
          placeholder="Message...."
          value={message}
          onChange={(e) => {
            isTyping();
            setMessage(e.target.value);
          }}
        />
      </form>
    </div>
  );
};

export default Form;
