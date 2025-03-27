import React from "react";
import '../styles/NewButton.css'
const NewButton = ({ text }) => {
  return (
    <div id="container">
      <button className="learn-more">
        <span className="circle" aria-hidden="true">
          <span className="icon arrow"></span>
        </span>
        <span className="button-text">{text}</span>
      </button>
    </div>
  );
};

export default NewButton;
