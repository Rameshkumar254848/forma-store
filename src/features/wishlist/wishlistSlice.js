
import { createSlice } from '@reduxjs/toolkit'

function loadWishlist() {
  try {
    const saved = localStorage.getItem('forma-wishlist')
    const parsed = saved ? JSON.parse(saved) : []

    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: loadWishlist(),
  reducers: {
    toggleWishlist(state, action) {
      const id = action.payload
      const index = state.indexOf(id)

      if (index >= 0) {
        state.splice(index, 1)
      } else {
        state.push(id)
      }
    },
  },
})

export const { toggleWishlist } = wishlistSlice.actions

export default wishlistSlice.reducer
