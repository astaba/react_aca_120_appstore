import React, { useEffect, useState } from "react";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import useCartContext from "../../context/useCartContext";

export default function HeaderCartButton({ onCartDisplay: displayCart, }) {
const [isAnimated, setIsAnimated] = useState(false)
 const { items, ...cartContextValue } = useCartContext();
//  const totalQuantity = items.reduce((currentItem, nextItem) => {
//   return currentItem.quantity + nextItem.quantity;
//  })
 const totalQuantity = items.reduce((currentQuantity, nextItem) => {
  return currentQuantity + nextItem.quantity;
 }, 0);
 const buttonClasses = `${classes.button} ${isAnimated ? classes.bump : ""}`;

useEffect(() => {
  if(totalQuantity === 0) return;

  setIsAnimated(true);
  const timer = setTimeout(() => {
    setIsAnimated(false);
  }, 300);

  return () => {
    clearTimeout(timer);
  }
}, [totalQuantity]);

  return (
    <button className={buttonClasses} onClick={displayCart}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{totalQuantity}</span>
    </button>
  );
}
