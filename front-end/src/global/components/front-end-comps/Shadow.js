import React from "react";
import "./Shadow.css";
import ReactDOM from "react-dom";

const Shadow = (props) => {
  return ReactDOM.createPortal(
    <div className="shadow" onClick={props.onClick}></div>,
    document.getElementById("shadow")
  );
};

export default Shadow;
