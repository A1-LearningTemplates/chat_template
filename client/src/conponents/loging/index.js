import React, { useState } from "react";
import axios from "axios";
import "./style.css";
const Login = ({ setIsLogedIn }) => {
  const [userName, setUserName] = useState("");
  const [image, setImage] = useState("");
  const login = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/user", {
        userName,
        image,
      });
      if (res) {
        setIsLogedIn(true);
        console.log(res);
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
          onChange={(event) => {
            setUserName(event.target.value);
          }}
        />
        <input
          className="input_two"
          placeholder="pick an image"
          onChange={(event) => {
            setImage(event.target.value);
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
    </div>
  );
};

export default Login;
