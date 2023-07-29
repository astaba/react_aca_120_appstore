import { useContext } from 'react'
import CartContext from './cart-context'

export default function useCartContext() {
  return useContext(CartContext);
}
