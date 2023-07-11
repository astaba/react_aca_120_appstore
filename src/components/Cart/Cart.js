import React from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";

const PLACEHOLDER_MEALS = [
  {
    id: "m1",
    name: "Sushi",
    description: "Finest fish and veggies",
    price: 22.99,
  },
  {
    id: "m4",
    name: "Green Bowl",
    description: "Healthy...and green...",
    price: 18.99,
  },
];

export default function Cart({ onCartDismiss: dismissCart }) {
  return (
    <Modal onCartDismiss={dismissCart}>
      <ul className={classes["cart-items"]}>
        {PLACEHOLDER_MEALS.map((meal) => (
          <li key={meal.id}>{meal.name}</li>
        ))}
      </ul>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>56.34</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={dismissCart}>
          Close
        </button>
        <button className={classes.button}>Order</button>
      </div>
    </Modal>
  );
}
