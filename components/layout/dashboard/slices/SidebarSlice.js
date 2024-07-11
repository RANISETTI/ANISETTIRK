import { createSlice } from '@reduxjs/toolkit';

const initialState = { isSidebarOpen: true };

const sidebarSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    toggleSidebar: (state, action) => ({ ...action.payload }),
  },
});

export const { toggleSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;
