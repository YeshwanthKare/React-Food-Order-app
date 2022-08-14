import React, { Fragment } from "react";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";

const Cart = ({ closeButton, orderButton }) => {
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {[{ id: "c1", name: "Sushi", amount: "2", price: "12.99" }].map(
        (item) => (
          <li key={item.id}>{item.name}</li>
        )
      )}
    </ul>
  );

  return (
    <Fragment>
      <Modal closeCart={closeButton}>
        {cartItems}
        <div className={classes.total}>
          <span>Total</span>
          <span>$39.99</span>
        </div>
        <div className={classes.actions}>
          <button className={classes["button--alt"]} onClick={closeButton}>
            Close
          </button>
          <button className={classes.button} onClick={orderButton}>
            Order
          </button>
        </div>
      </Modal>
    </Fragment>
  );
};

export default Cart;
