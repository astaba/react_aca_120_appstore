import React, { useState } from "react";
import classes from "./Checkout.module.css";
import useCustomForm from "../../hooks/useCustomForm.js";

const INITIAL_STATE = {
  name: "",
  street: "",
  postal: "",
  city: "",
};

const VALIDATIONS = {
  name: [
    {
      isValid: (value) => !!value,
      message: "Your name is required",
    },
    {
      isValid: (value) => /^[A-Za-z-]{3,10}$/.test(value),
      message: "Please enter a valid name with 3 to 10 characters",
    },
  ],
  postal: [
    {
      isValid: (value) => !!value,
      message: "Your postal code is required",
    },
    {
      isValid: (value) => /^[0-9]{3}-[0-9]{2}$/.test(value),
      message: "Please enter a valid postal code in the format ddd-dd",
    },
  ],
  street: [
    {
      isValid: (value) => !!value,
      message: "Your street name is required",
    },
    {
      isValid: (value) => /^[A-Za-z-]+$/.test(value),
      message: "Please enter a valid name in alphabetic characters",
    },
  ],
  city: [
    {
      isValid: (value) => !!value,
      message: "Your city name is required",
    },
    {
      isValid: (value) => /^[A-Za-z-]+$/.test(value),
      message: "Please enter a valid name in alphabetic characters",
    },
  ],
};

export default function Checkout({ onCartDismiss: dismissCart, onSubmitOrder: submitOrder }) {
  const {
    formInputs,
    hasError,
    isDirtyWithError,
    getErrorMessage,
    handleChange,
    handleBlur,
    smudgeInputs,
    reset,
  } = useCustomForm(INITIAL_STATE, VALIDATIONS);

  const handleSubmit = (e) => {
    e.preventDefault();
    smudgeInputs();
    if (hasError) return;
    console.log(formInputs);
    submitOrder({ ...formInputs });
    reset();
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <div
        className={
          !isDirtyWithError("name")
            ? classes.control
            : `${classes.control} ${classes.invalid}`
        }
      >
        <label htmlFor="name">Your name: </label>
        <input
          type="text"
          id="name"
          value={formInputs.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {isDirtyWithError("name") ? <p>{getErrorMessage("name")}</p> : null}
      </div>
      <div
        className={
          !isDirtyWithError("street")
            ? classes.control
            : `${classes.control} ${classes.invalid}`
        }
      >
        <label htmlFor="street">Street: </label>
        <input
          type="text"
          id="street"
          value={formInputs.street}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {isDirtyWithError("street") ? <p>{getErrorMessage("street")}</p> : null}
      </div>
      <div
        className={
          !isDirtyWithError("postal")
            ? classes.control
            : `${classes.control} ${classes.invalid}`
        }
      >
        <label htmlFor="postal">Postal code: </label>
        <input
          type="text"
          id="postal"
          value={formInputs.postal}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {isDirtyWithError("postal") ? <p>{getErrorMessage("postal")}</p> : null}
      </div>
      <div
        className={
          !isDirtyWithError("city")
            ? classes.control
            : `${classes.control} ${classes.invalid}`
        }
      >
        <label htmlFor="city">City: </label>
        <input
          type="text"
          id="city"
          value={formInputs.city}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {isDirtyWithError("city") ? <p>{getErrorMessage("city")}</p> : null}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={dismissCart}>
          Cancel
        </button>
        <button disabled={hasError} className={classes.submit}>
          Confirm
        </button>
      </div>
    </form>
  );
}
