import React from "react";
import classes from "./Input.module.css";

const Input = React.forwardRef(
  ({ label, input: { id, ...inputAttr } }, ref) => {
    return (
      <div className={classes.input}>
        <label htmlFor={id}>{label}</label>
        <input id={id} {...inputAttr} ref={ref} />
      </div>
    );
  }
);

export default Input;
