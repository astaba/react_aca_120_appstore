import { useContext } from 'react'
import cartContext from './cart-context'

export default function useCartContext() {
  const cartContextValue = useContext(cartContext);
  return cartContextValue;
}
