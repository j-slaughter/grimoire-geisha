/**
 * @module userReducer.js
 * @description Reducer for user state
 */

import { createSlice } from '@reduxjs/toolkit';

// Initialize state
const initialState = {
  user: null,
  loading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Update the user info
    updateUser(state, action) {
      // Assign state the action payload
      state.user = action.payload;
    },
    // Update the user loading state
    updateLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

// Export the generated action creators for use in components
export const { updateUser, updateLoading } = userSlice.actions;
// Export the slice reducer for use in the store configuration
export default userSlice.reducer;
