/**
 * @module productReducer.js
 * @description Reducer for products state
 */

import { createSlice } from '@reduxjs/toolkit';

// Initialize state
const initialState = {
  products: [],
  loading: false,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // Load products from database
    loadProducts(state, action) {
      state.products = action.payload;
    },
    // Add a new product to the products list
    addProduct(state, action) {
      state.products.push(action.payload);
    },
    // Delete a product from the products list
    deleteProduct(state, action) {
      state.products = state.products.filter((product) => product._id !== action.payload._id);
    },
    // Update the products loading state
    updateLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

// Export the generated action creators for use in components
export const { loadProducts, addProduct, deleteProduct, updateLoading } = productSlice.actions;
// Export the slice reducer for use in the store configuration
export default productSlice.reducer;
