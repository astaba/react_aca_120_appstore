import React from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import useCartContext from "../../context/useCartContext";
import CartItem from "./CartItem";

// const PLACEHOLDER_MEALS = [
//   {
//     id: "m1",
//     name: "Sushi",
//     description: "Finest fish and veggies",
//     price: 22.99,
//   },
//   {
//     id: "m4",
//     name: "Green Bowl",
//     description: "Healthy...and green...",
//     price: 18.99,
//   },
// ];

export default function Cart({ onCartDismiss: dismissCart }) {
  const cartCtxValue = useCartContext();
  const totalAmount = `$${cartCtxValue.totalAmount.toFixed(2)}`;
  // const totalAmount = `$${cartCtxValue.totalAmount}`;
  const hasItem = cartCtxValue.items.length > 0;

  const addCartItem = (item) => {
    cartCtxValue.addItem({ ...item, quantity: 1 });
  };
  const removeCartItem = (id) => {
    cartCtxValue.removeItem(id);
  };

  return (
    <Modal onCartDismiss={dismissCart}>
      <ul className={classes["cart-items"]}>
        {cartCtxValue.items.map((meal) => (
          <CartItem
            key={meal.id}
            {...meal}
            onAdd={addCartItem.bind(null, meal)}
            onRemove={removeCartItem.bind(null, meal.id)}
          />
        ))}
      </ul>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={dismissCart}>
          Close
        </button>
        {hasItem && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
}
