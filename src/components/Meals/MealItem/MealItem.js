import React, { useContext } from "react";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import CartContext from "../../../store/cart-context";

function MealItem({ name, description, price, id }) {
  const cartCtx = useContext(CartContext);

  const addItemtoCart = (amount) => {
    cartCtx.addItem({
      item: name,
      amount: amount,
      id: id,
      price: price,
    });
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3 className={classes.name}>{name}</h3>
        <div className={classes.description}>{description}</div>
        <div className={classes.price}>{`$${price.toFixed(2)}`}</div>
      </div>
      <div>
        <MealItemForm onAddtoCart={addItemtoCart} />
      </div>
    </li>
  );
}

export default MealItem;
