import React from "react";
import "./SideBar.css";
import ReactDom from "react-dom";
import { CSSTransition } from "react-transition-group";

const SideBar = (props) => {
  const sideBarContent = (
    <CSSTransition
      in={props.show}
      timeout={200}
      classNames="slide-in-left"
      mountOnEnter
      unmountOnExit
    >
      <aside onClick={props.onClick} className="side-bar">
        {props.children}
      </aside>
    </CSSTransition>
  );

  return ReactDom.createPortal(
    sideBarContent,
    document.getElementById("side-bar")
  );
};

export default SideBar;
