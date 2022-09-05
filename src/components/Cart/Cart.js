import React, { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import CheckOut from "./CheckOut";

const Cart = ({ closeButton }) => {
  const [isCheckOut, setIsCheckOut] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
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

  const orderButtonHandler = () => {
    setIsCheckOut(true);
  };

  const submittingCartData = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      "https://react-http-c4544-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({ user: userData, orderedItems: cartCtx.items }),
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };

  let modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={closeButton}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderButtonHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckOut && (
        <CheckOut onConfirm={submittingCartData} onCancel={closeButton} />
      )}
      {!isCheckOut && modalActions}
    </React.Fragment>
  );

  const isSubmittingModalContent = <p>Sending your Order...</p>;

  const didSumitModalContent = (
    <React.Fragment>
      <p>Successfully your order was placed...</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={closeButton}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal closeCart={closeButton}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && !didSubmit && isSubmittingModalContent}
      {didSubmit && !isSubmitting && didSumitModalContent}
    </Modal>
  );
};

export default Cart;
