import "./style.css";
import Text from "./Text";
import { useEffect, useRef } from "react";
const Form = ({
  message,
  setMessage,
  messages,
  sendMessage,
  chatBox,
  data,
}) => {
  const scrollRef = useRef(null);
  useEffect(() => {
    // scrollRef.current = document.querySelectorAll(".message");
    if (scrollRef.current) {
      console.log(scrollRef.current);
      scrollRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [messages]);
  return (
    <div className="popup_form">
      <Text chatBox={chatBox} />

      <div className="chat_box">
        {messages.length &&
          messages.map((ele, index) => {
            console.log(ele);
            return (
              <div key={index} className="sende_box">
                <span
                  className={
                    (ele.sender.userName || ele.sender) === data.userName
                      ? "sender_green sender"
                      : "sender_red sender"
                  }
                >
                  {index === 0 && (ele.sender.userName || ele.sender)}
                  {(ele.sender.userName || ele.sender) !==
                  (messages[index && index - 1].sender.userName ||
                    messages[index && index - 1].sender)
                    ? ele.sender.userName || ele.sender
                    : ""}
                </span>
                <p
                  ref={scrollRef}
                  className={
                    (ele.sender.userName || ele.sender) === data.userName
                      ? "message_green message"
                      : "message_red message"
                  }
                >
                  {ele.message}
                </p>
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
