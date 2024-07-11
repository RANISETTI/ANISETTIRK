import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const quotationSlice = createSlice({
  name: 'quotation',
  initialState,
  reducers: {
    updateQuotation: (state, action) => ({ ...action.payload }),
  },
});

export const { updateQuotation } = quotationSlice.actions;
export default quotationSlice.reducer;
