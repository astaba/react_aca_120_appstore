import React, { useState } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import useCartContext from "../../context/useCartContext";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

export default function Cart({ onCartDismiss: dismissCart }) {
  const [isCheckout, setIsCheckout] = useState(false);
  const [uiSwitcher, setUiSwitcher] = useState("CART_UI");
  const [error, setError] = useState(null);
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

  const openOrderForm = () => {
    setIsCheckout(true);
  };

  const submitOrder = (userData) => {
    setUiSwitcher("IS_SUBMITTING");
    fetch("https://app-store-6bb68-default-rtdb.firebaseio.com/order.json", {
      method: "POST",
      body: JSON.stringify({
        user: userData,
        orderedMeal: cartCtxValue.items,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUiSwitcher("DID_SUBMIT");
        cartCtxValue.resetCart();
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
        setUiSwitcher("FAILED_TO_SUBMIT");
      })
      .finally(() => {});
  };

  return (
    <Modal onCartDismiss={dismissCart}>
      {
        {
          CART_UI: (
            <React.Fragment>
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
              {!isCheckout ? (
                <div className={classes.actions}>
                  <button
                    className={classes["button--alt"]}
                    onClick={dismissCart}
                  >
                    Close
                  </button>
                  {hasItem && (
                    <button className={classes.button} onClick={openOrderForm}>
                      Order
                    </button>
                  )}
                </div>
              ) : (
                <Checkout
                  onCartDismiss={dismissCart}
                  onSubmitOrder={submitOrder}
                />
              )}
            </React.Fragment>
          ),

          IS_SUBMITTING: <p>Submitting order...</p>,
          DID_SUBMIT: (
            <React.Fragment>
              <p>Successfully submitted your order!</p>
              <div className={classes.actions}>
                <button className={classes.button} onClick={dismissCart}>
                  Close
                </button>
              </div>
            </React.Fragment>
          ),
          FAILED_TO_SUBMIT: (
            <React.Fragment>
              <p>{error}</p>
              <div className={classes.actions}>
                <button className={classes.button} onClick={dismissCart}>
                  Close
                </button>
              </div>
            </React.Fragment>
          ),
        }[uiSwitcher]
      }
    </Modal>
  );
}
