import "./App.css";
import React, { useState } from "react";
import Chat from "./components/chat";
import Sw from "./components/Sw";
import Login from "./components/loging";
const App = () => {
  const [isLogedIn, setIsLogedIn] = useState(
    localStorage.getItem("isLogedIn") || false
  );

  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("data")) || ""
  );
  return (
    <div className="App">
      {!isLogedIn ? (
        <Login setIsLogedIn={setIsLogedIn} setData={setData} />
      ) : (
        <Chat setIsLogedIn={setIsLogedIn} data={data} />
      )}
    </div>
  );
};

export default App;
