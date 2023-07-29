import React, { useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartCxtProvider from "./context/CartCxtProvider";

export default function App() {
  const [isCartDisplayed, setIsCartDisplayed] = useState(false);

  const displayCart = () => {
    setIsCartDisplayed(true);
  };
  const dismissCart = () => {
    setIsCartDisplayed(false);
  };

  return (
    <CartCxtProvider>
      <Header onCartDisplay={displayCart} />
      <main>
        <Meals />
        {isCartDisplayed && <Cart onCartDismiss={dismissCart} />}
      </main>
    </CartCxtProvider>
  );
}
