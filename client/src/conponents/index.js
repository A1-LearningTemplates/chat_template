import React, { useEffect } from "react";
import { io } from "socket.io-client";
const socket = io("http://localhost:5000");
const Chat = () => {
  useEffect(() => {
    socket.on("connection", () => {});
  }, []);

  return (
    <div>
      {" "}
      <button
        onClick={() => {
          socket.emit("message", "hi");
        }}
      >
        send
      </button>{" "}
      Chat
    </div>
  );
};

export default Chat;
