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
    // Add a new product to the products list
    addProduct(state, action) {
      state.products.push(action.payload);
    },
    // Update the products loading state
    updateLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

// Export the generated action creators for use in components
export const { addProduct, updateLoading } = productSlice.actions;
// Export the slice reducer for use in the store configuration
export default productSlice.reducer;
