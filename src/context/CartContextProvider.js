import React, { useReducer } from "react";
import cartContext from "./cart-context";

const INITIAL_CART_ITEMS = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  let newItems;
  let itemI;
  let newTotalAmount;
  switch (action.type) {
    case "ADD":
      itemI = state.items.findIndex(
         (item) => item.id === action.payload.id
      );
      if(itemI === -1) {
        newItems = state.items.concat(action.payload);
      } else {
        newItems = state.items;
        newItems[itemI].quantity = state.items[itemI].quantity + action.payload.quantity;
      }
      newTotalAmount = state.totalAmount + action.payload.price * action.payload.quantity;
      newTotalAmount = +newTotalAmount.toFixed(2);
      return {
        items: newItems,
        totalAmount: newTotalAmount,
      };
    case "REMOVE":
      itemI = state.items.findIndex((item) => item.id === action.payload);
      if(state.items[itemI].quantity === 1) {
        newItems = state.items.filter((item) => item.id !== action.payload)
      } else {
      newItems = state.items;
      newItems[itemI].quantity = state.items[itemI].quantity - 1;
      }
      newTotalAmount = state.totalAmount - state.items[itemI].price;
      newTotalAmount = +newTotalAmount.toFixed(2);
      return {
        items: newItems,
        totalAmount: newTotalAmount,
      };
    default:
      return INITIAL_CART_ITEMS;
  }

  // if (action.type === 'ADD') {
  //   const updatedTotalAmount =
  //     state.totalAmount + action.payload.price * action.payload.quantity;

  //   const existingCartItemIndex = state.items.findIndex(
  //     (item) => item.id === action.payload.id
  //   );
  //   const existingCartItem = state.items[existingCartItemIndex];
  //   let updatedItems;

  //   if (existingCartItem) {
  //     const updatedItem = {
  //       ...existingCartItem,
  //       amount: existingCartItem.quantity + action.payload.quantity,
  //     };
  //     updatedItems = [...state.items];
  //     updatedItems[existingCartItemIndex] = updatedItem;
  //   } else {
  //     updatedItems = state.items.concat(action.payload);
  //   }

  //   return {
  //     items: updatedItems,
  //     totalAmount: updatedTotalAmount,
  //   };
  // }
  // if (action.type === 'REMOVE') {
  //   const existingCartItemIndex = state.items.findIndex(
  //     (item) => item.id === action.payload
  //   );
  //   const existingItem = state.items[existingCartItemIndex];
  //   const updatedTotalAmount = state.totalAmount - existingItem.price;
  //   let updatedItems;
  //   if (existingItem.quantity === 1) {
  //     updatedItems = state.items.filter(item => item.id !== action.payload);
  //   } else {
  //     const updatedItem = { ...existingItem, amount: existingItem.quantity - 1 };
  //     updatedItems = [...state.items];
  //     updatedItems[existingCartItemIndex] = updatedItem;
  //   }

  //   return {
  //     items: updatedItems,
  //     totalAmount: updatedTotalAmount
  //   };
  // }

  // return INITIAL_CART_ITEMS;
};

export default function CartContextProvider(props) {
  const [cartState, dispatchCart] = useReducer(cartReducer, INITIAL_CART_ITEMS);

  const addItem = (item) => {
    dispatchCart({ type: "ADD", payload: item });
  };
  const removeItem = (id) => {
    dispatchCart({ type: "REMOVE", payload: id, });
  };

  const cartContextValue = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem,
    removeItem,
  };

  return (
    <cartContext.Provider value={cartContextValue}>
      {props.children}
    </cartContext.Provider>
  );
}
