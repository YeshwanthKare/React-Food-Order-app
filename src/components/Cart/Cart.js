import React, { Fragment, useContext } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = ({ closeButton, orderButton }) => {
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.item}
          amount={item.amount}
          price={item.price}
          id={item.id}
          onAdd={cartItemAddHandler.bind(null, item)}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  return (
    <Fragment>
      <Modal closeCart={closeButton}>
        {cartItems}
        <div className={classes.total}>
          <span>Total</span>
          <span>{totalAmount}</span>
        </div>
        <div className={classes.actions}>
          <button className={classes["button--alt"]} onClick={closeButton}>
            Close
          </button>
          {hasItems && (
            <button className={classes.button} onClick={orderButton}>
              Order
            </button>
          )}
        </div>
      </Modal>
    </Fragment>
  );
};

export default Cart;
