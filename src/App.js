import React, { useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartContextProvider from "./context/CartContextProvider";

export default function App() {
  const [isCartDisplayed, setIsCartDisplayed] = useState(false);

  const displayCart = () => {
    setIsCartDisplayed(true);
  };
  const dismissCart = () => {
    setIsCartDisplayed(false);
  };

  return (
    <CartContextProvider>
      <Header onCartDisplay={displayCart} />
      <main>
        <Meals />
        {isCartDisplayed && <Cart onCartDismiss={dismissCart} />}
      </main>
    </CartContextProvider>
  );
}
