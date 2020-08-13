import React from "react";
import "./MainWrap.css";

const MainWrap = (props) => {
  return <header className="main-wrap">{props.children}</header>;
};

export default MainWrap;
