import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  accessToken: "",
  userDetails: {},
  sessionid: "",
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginFailed: () => initialState,
    updateUser: (state, action) => ({ ...action.payload }),
  },
});

export const { loginFailed, updateUser } = loginSlice.actions;
export default loginSlice.reducer;
