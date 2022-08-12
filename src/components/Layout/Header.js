import React, { Fragment } from "react";
import MealsImg from "../assets/meals.jpeg";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

function Header() {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton />
      </header>
      <div className={classes["main-image"]}>
        <img src={MealsImg} alt="A table full of delicious Food!" />
      </div>
    </Fragment>
  );
}

export default Header;
