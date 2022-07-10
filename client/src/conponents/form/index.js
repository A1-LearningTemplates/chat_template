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
}) => {
  const scrollRef = useRef(null);
  useEffect(() => {
    // scrollRef.current = document.querySelectorAll(".message");
    if (scrollRef.current) {
      console.log(scrollRef.current);
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
        {messages.length &&
          messages.map((ele, index) => {
            return (
              <div key={index} className="sende_box">
                <span>{timeago.format(ele.createdAt)}</span>
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
                  // ref={index === messages.length - 1 ? scrollRef : null}
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
