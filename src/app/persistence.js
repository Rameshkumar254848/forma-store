
import { store } from './store'

store.subscribe(() => {
  try {
    const state = store.getState()

    localStorage.setItem('forma-cart', JSON.stringify(state.cart))
    localStorage.setItem('forma-wishlist', JSON.stringify(state.wishlist))
  } catch (error) {
    console.error('Unable to persist FORMA shopping state:', error)
  }
})
