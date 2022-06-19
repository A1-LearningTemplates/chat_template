import "./App.css";
import React, { useState } from "react";
import Chat from "./conponents/chat";
import Sw from "./conponents/Sw";
import Login from "./conponents/loging";
const App = () => {
  const [isLogedIn, setIsLogedIn] = useState(false);
  return (
    <div className="App">
      {isLogedIn ? (
        <Chat setIsLogedIn={setIsLogedIn} />
      ) : (
        <Login setIsLogedIn={setIsLogedIn} />
      )}
    </div>
  );
};

export default App;
