/**
 * @module cartReducer.js
 * @description Reducer for cart state
 */

import { createSlice } from '@reduxjs/toolkit';

// Initialize state
const initialState = {
  cart: [],
  coupon: null,
  subtotal: 0,
  total: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Load cart from database
    loadCart(state, action) {
      state.cart = action.payload;
    },
    // Add a product to the cart
    addToCart(state, action) {
      // Check if item already exists in cart
      const alreadyInCart = state.cart.find((product) => product._id === action.payload._id);
      // Either update product quantity or add product to cart
      if (alreadyInCart) {
        state.cart.map((product) =>
          product._id === action.payload._id
            ? { ...product, quantity: product.quantity + 1 }
            : product
        );
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    // Delete a product from the cart
    deleteFromCart(state, action) {
      state.cart = state.cart.filter((product) => product._id !== action.payload);
    },
    // Update coupon
    updateCoupon(state, action) {
      state.coupon = action.payload;
    },
    // Update the cart subtotal
    updateSubtotal(state, action) {
      state.subtotal = action.payload;
    },
    // Update the cart total
    updateTotal(state, action) {
      state.total = action.payload;
    },
  },
});

// Export the generated action creators for use in components
export const { loadCart, addToCart, deleteFromCart, updateCoupon, updateSubtotal, updateTotal } =
  cartSlice.actions;
// Export the slice reducer for use in the store configuration
export default cartSlice.reducer;
