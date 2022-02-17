import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    list: [],
    toDoEditing: null,
  },
  reducers: {
    getAllToDos: (state, action) => {
      state.list = action.payload;
    },
    getToDo: (state, action) => {
      state.toDoEditing = action.payload;
    },
  },
});
export const { getAllToDos, getToDo } = authSlice.actions;
export default authSlice.reducer;
