import "./App.css";
import React, { useState } from "react";
import Chat from "./components/chat";
import Login from "./components/loging";
import Notification from "./components/notification";

const App = () => {
  const [isLogedIn, setIsLogedIn] = useState(
    localStorage.getItem("isLogedIn") || false
  );

  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("data")) || ""
  );
  const [notification, setNotification] = useState(null);
  return (
    <div className="App">
      {!isLogedIn ? (
        <Login setIsLogedIn={setIsLogedIn} setData={setData} />
      ) : (
        <div className="home">
          <div className="notification">
            <Notification data={data} notification={notification} setNotification={setNotification} />
          </div>

          <Chat
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
