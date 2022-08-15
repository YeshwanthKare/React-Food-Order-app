import React from "react";
import CartContext from "./cart-context";

const CartProvider = (props) => {
  const addItemstoCart = (item) => {};

  const removeItemsfromCart = (id) => {};

  const cartContext = {
    items: [],
    totalAmount: 0,
    addItem: addItemstoCart,
    removeItem: removeItemsfromCart,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
