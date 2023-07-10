import React from "react";
import mealsImage from "../../assets/meals.jpg";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

export default function Header() {
  return (
    <React.Fragment>
      <header className={classes.header}>
        <h1>React Meals App</h1>
        <HeaderCartButton />
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="A table with many delicious meals" />
      </div>
    </React.Fragment>
  );
}
