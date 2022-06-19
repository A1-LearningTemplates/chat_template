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
        <h2>join our comiunity</h2>

        <input
          placeholder="User name"
          onChange={(event) => {
            setUserName(event.target.value);
          }}
        />
        <input
          placeholder="pick an image"
          onChange={(event) => {
            setImage(event.target.value);
          }}
        />
        <button> Join chat</button>
        <p>
          t is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using 'Content here, content here', making it
          look like readable English. Many desktop publishing packages
        </p>
      </form>
    </div>
  );
};

export default Login;
