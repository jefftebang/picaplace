import React, { Fragment } from "react";
import "./Modal.css";
import ReactDOM from "react-dom";
import Shadow from "./Shadow";
import { CSSTransition } from "react-transition-group";

const ModalView = (props) => {
  const modalContent = (
    <div className={`modal1 ${props.className}`} style={props.style}>
      <header className={`modal__header ${props.headerClass}`}>
        <h6>{props.header}</h6>
        <button onClick={props.onClick} className="x-btn">
          X
        </button>
      </header>
      <form
        onSubmit={
          props.onSubmit ? props.onSubmit : (event) => event.preventDefault()
        }
      >
        <div className={`modal__content ${props.contentClass}`}>
          {props.children}
        </div>
        <footer className={`modal__footer ${props.footerClass}`}>
          {props.footer}
        </footer>
      </form>
    </div>
  );
  return ReactDOM.createPortal(
    modalContent,
    document.getElementById("openModal")
  );
};

const Modal = (props) => {
  return (
    <Fragment>
      {props.show && <Shadow onClick={props.onClick} />}
      <CSSTransition
        in={props.show}
        timeout={200}
        classNames="modal"
        mountOnEnter
        unmountOnExit
      >
        <ModalView {...props} />
      </CSSTransition>
    </Fragment>
  );
};

export default Modal;
