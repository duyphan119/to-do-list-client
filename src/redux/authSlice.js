import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isFetching: false,
    currentUser: null,
    error: false,
  },
  reducers: {
    signInStart: (state) => {
      state.isFetching = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.isFetching = false;
      state.error = false;
    },
    signInFail: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    signOutSuccess: (state) => {
      state.currentUser = null;
      state.error = false;
    },
    updateToken: (state, action) => {
      state.currentUser.accessToken = action.payload;
    }
  },
});
export const { signInFail, signInStart, signInSuccess, signOutSuccess, updateToken } =
  authSlice.actions;
export default authSlice.reducer;
