import "./App.css";
import React, { useState } from "react";
import Chat from "./components/chat";
import Login from "./components/loging";
import Notification from "./components/notification";
import { io } from "socket.io-client";

const App = () => {
  const [isLogedIn, setIsLogedIn] = useState(
    localStorage.getItem("isLogedIn") || false
  );
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("data")) || ""
  );
  const [socket, setsocket] = useState(
    io("http://localhost:5000", {
      query: {
        userName: data.userName,
        _id: data._id,
        /**here it is possible to send client information when connecting */
      },
      autoConnect: false,
      // reconnection: false,
    })
  );
  const [notification, setNotification] = useState(null);

  return (
    <div className="App">
      {!isLogedIn ? (
        <Login setIsLogedIn={setIsLogedIn} setData={setData} />
      ) : (
        <div className="home">
          <div className="notification">
            <Notification
              data={data}
              notification={notification}
              setNotification={setNotification}
              socket={socket}
            />
          </div>

          <Chat
            socket={socket}
            setIsLogedIn={setIsLogedIn}
            data={data}
            notification={notification}
            setNotification={setNotification}
          />
        </div>
      )}
    </div>
  );
};

export default App;
