import React, { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updateStateItem = state.items.concat(action.item);
    const updateStateAmount =
      state.totalAmount + action.item.price * action.item.amount;
    return {
      items: updateStateItem,
      totalAmount: updateStateAmount,
    };
  }
};

const CartProvider = (props) => {
  const [cartState, dispatchCartState] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemstoCart = (item) => {
    dispatchCartState({ type: "ADD", item: item });
  };

  const removeItemsfromCart = (id) => {
    dispatchCartState({ type: "REMOVE", id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
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
