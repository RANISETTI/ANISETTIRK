import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    updateCart: (state, action) => ({ ...action.payload }),
  },
});

export const { updateCart } = cartSlice.actions;
export default cartSlice.reducer;
