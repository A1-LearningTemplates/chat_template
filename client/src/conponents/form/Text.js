import React from "react";
const chararcters = ["c", "h", "a", "t", "i", "n", "g", "w", "i", "t", "h"];
const Text = ({ chatBox }) => {
  return (
    <div className="popup_form_name">
      <h4 className="form_name_header">
        {chararcters.map((char, index) => {
          return <span className={char + index}>{char}</span>;
        })}{" "}
        {chatBox.userName}
      </h4>
    </div>
  );
};

export default Text;
