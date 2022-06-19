import React from "react";
import "./style.css";
const Login = () => {
  return (
    <div className="form_container">
      <form className="form_box">
        <h2>join our comiunity</h2>
        <p>
          t is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using 'Content here, content here', making it
          look like readable English. Many desktop publishing packages
        </p>
        <input placeholder="User name" />
        <input placeholder="pick an image" />
        <button> Join chat</button>
      </form>
    </div>
  );
};

export default Login;
