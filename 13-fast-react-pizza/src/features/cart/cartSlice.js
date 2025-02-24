import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cart: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      state.cart.push(action.payload)
    },
    deleteItem(state, action) {
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload)
    },
    clearCart(state) {
      state.cart = state.cart = []
    },
    increaseItemQuantity(state, action) {
      const item = state.cart.find(item=>item.pizzaId===action.payload)
      item.quantity++
    },
    decreaseItemQuantity(state, action) {
      const item = state.cart.find(item=>item.pizzaId===action.payload)
      item.quantity--
      if(item.quantity === 0) cartSlice.caseReducers.clearCart(state, action)
    }
  },
})

export const { addItem, deleteItem, clearCart, increaseItemQuantity, decreaseItemQuantity} = cartSlice.actions
export default cartSlice.reducer

export function getCart(state) {
  return state.cart.cart
}

export function getTotalItems(state) {
  return state.cart.cart.reduce((acc, cur) => cur.quantity + acc, 0)
}

export function getTotalItemsPrice(state) {
  return state.cart.cart.reduce(
    (acc, cur) => cur.unitPrice * cur.quantity + acc,
    0,
  )
}

export function getQuantityById(id) {
  return (state) => state.cart.cart.find(item=>item.pizzaId === id)?.quantity ?? 0 
}


