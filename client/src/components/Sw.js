import React from "react";

const Sw = () => {
  let ws = new WebSocket("ws://localhost:8000");
  ws.onopen=(event)=> {
      ws.send("i am connected from brwoser")
  }

  ws.onmessage = (event)=> {
      console.log(event);
  }
  return <div>Sw</div>;
};

export default Sw;
