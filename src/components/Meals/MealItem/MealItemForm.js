import React, { useRef, useState } from "react";
import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";

export default function MealItemForm({ onAddItem: addToCart, ...props }) {
  const [isValidQty, setIsValidQty] = useState(true);
  const inputRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    const enteredQty = inputRef.current.value.trim();

    if (+enteredQty < 1 || +enteredQty > 5) {
      setIsValidQty(false);
      return;
    }
    setIsValidQty(true);
    addToCart(+enteredQty);
    inputRef.current.value = "1";
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <Input
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
        ref={inputRef}
      />
      <button>+ Add</button>
      {!isValidQty && <p>Please enter a valid quantity (from 1 through 5)</p>}
    </form>
  );
}
