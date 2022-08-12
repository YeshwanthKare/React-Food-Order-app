import React from "react";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";

function MealItem({ name, description, price }) {
  return (
    <li className={classes.meal}>
      <div>
        <h3 className={classes.name}>{name}</h3>
        <div className={classes.description}>{description}</div>
        <div className={classes.price}>{`$${price.toFixed(2)}`}</div>
      </div>
      <div>
        <MealItemForm />
      </div>
    </li>
  );
}

export default MealItem;
