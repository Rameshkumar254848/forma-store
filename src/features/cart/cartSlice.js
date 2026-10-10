
import { createSlice } from '@reduxjs/toolkit'

const STORAGE_KEY = 'forma-cart'

function loadCart() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    const parsed = saved ? JSON.parse(saved) : []

    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: loadCart(),
  reducers: {
    addToCart(state, action) {
      const { product, quantity = 1 } = action.payload

      if (!Number.isInteger(quantity) || quantity < 1) return

      const existing = state.find((item) => item.id === product.id)

      if (existing) {
        existing.quantity += quantity
      } else {
        state.push({ ...product, quantity })
      }
    },

    updateQuantity(state, action) {
      const { id, quantity } = action.payload
      const item = state.find((product) => product.id === id)

      if (item && Number.isInteger(quantity) && quantity >= 1 && quantity <= 99) {
        item.quantity = quantity
      }
    },

    removeFromCart(state, action) {
      return state.filter((item) => item.id !== action.payload)
    },

    clearCart() {
      return []
    },
  },
})

export const {
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions

export default cartSlice.reducer
