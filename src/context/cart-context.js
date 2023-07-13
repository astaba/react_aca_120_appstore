import React from 'react'

// const cartContext = React.createContext();
const cartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: () => {},
  removeItem: () => {},
});

export default cartContext;