/**
 * @module cartReducer.js
 * @description Reducer for cart state
 */

import { createSlice } from '@reduxjs/toolkit';

// Initialize state
const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Update the form page
    updateForm(state, action) {
      // Assign state the action payload
      state.page = action.payload;
    },
  },
});

// Export the generated action creators for use in components
export const { updateForm } = cartSlice.actions;
// Export the slice reducer for use in the store configuration
export default cartSlice.reducer;
