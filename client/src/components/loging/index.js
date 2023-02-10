import React, { useState } from "react";
import axios from "axios";
import "./style.css";
const Login = ({ setIsLogedIn, setData }) => {
  const [userName, setUserName] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");

  const login = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/user", {
        password,
        userName,
      });
      if (res) {
        console.log(res);
        setIsLogedIn(true);
        localStorage.setItem("isLogedIn", true);
        setData(res.data.data);
        localStorage.setItem("data", JSON.stringify(res.data.data));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="form_container">
      <form
        className="form_box"
        onSubmit={(event) => {
          login(event);
        }}
      >
        <h2 className="header">join our comiunity</h2>

        <input
          className="input_one"
          placeholder="User name"
          required
          type="text"
          minLength="6"
          onChange={(event) => {
            setUserName(event.target.value);
          }}
        />
        <input
          className="input_two"
          placeholder="Password"
          required
          minLength="6"
          type="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <button className="btn"> Join chat</button>
        <p className="paragraph">
          An App designed for chat, built with Nodejs & sockit.io framework in
          the backend and react.js in frontend, also this app includes animation
          using pure css.
          <br /> Just fill the inputs an injoy chating with friends.
        </p>
      </form>
      <span className="line"></span>
    </div>
  );
};

export default Login;
