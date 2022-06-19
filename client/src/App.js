import "./App.css";
import Chat from "./conponents/chat";
import Sw from "./conponents/Sw";
import Login from "./conponents/loging";

const App = () => {
  return (
    <div className="App">
      <Login />
      <Chat />
    </div>
  );
};

export default App;
