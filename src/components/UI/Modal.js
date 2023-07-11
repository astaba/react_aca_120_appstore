import React from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";

const Backdrop = ({ onCartDismiss: dismissCart }) => {
  return <div className={classes.backdrop} onClick={dismissCart} />;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const modalPortal = document.getElementById("modal-root");

export default function Modal({ onCartDismiss: dismissCart, ...props }) {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(<Backdrop onCartDismiss={dismissCart} />, modalPortal)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        modalPortal
      )}
    </React.Fragment>
  );
}
