import React from "react";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import useCartContext from "../../../context/useCartContext";

function MealItem(props) {
  const cartCtxValue = useCartContext();

  const price = `$${props.price.toFixed(2)}`;

  const addToCart = (quantity) => {
    cartCtxValue.addItem({
      id: props.id,
      name: props.name,
      price: props.price,
      quantity,
    });
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm id={props.id} onAddItem={addToCart} />
      </div>
    </li>
  );
}

export default MealItem;
