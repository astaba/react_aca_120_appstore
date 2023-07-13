import React from "react";
import classes from "./CartItem.module.css";

export default function CartItem({
  onAdd: addCartItem,
  onRemove: removeCartItem,
  ...props
}) {
  const price = `$${props.price.toFixed(2)}`;

  return (
    <li className={classes["cart-item"]}>
      <div>
        <h2>{props.name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{price}</span>
          <span className={classes.amount}>x {props.quantity}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={removeCartItem}>−</button>
        <button onClick={addCartItem}>+</button>
      </div>
    </li>
  );
}
