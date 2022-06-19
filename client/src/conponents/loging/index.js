import React from "react";
import Avatar from "react-avatar";
const Login = () => {
  return (
    <div className="form_container">
      <Avatar>H</Avatar>
      <Avatar style={{ bgcolor: deepOrange[500] }}>N</Avatar>
      <Avatar style={{ bgcolor: deepPurple[500] }}>OP</Avatar>
      <form className="form_box">
        <input placeholder="User name" />
        <input placeholder="pick an image" />
        <button> Join chat</button>
      </form>
    </div>
  );
};

export default Login;
