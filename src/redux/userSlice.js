import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers : {
    addUser : (state, action) => {
      
      return action.payload;
    },
    removeUser : () => {
      return null;
    },
    addProfile(state, action) {
      // Only update if the user is logged in
      if (state) {
          return { ...state, ...action.payload };
      }
      return state; // Ignore profile updates if no user is logged in
  },
  },
});

export const { addUser, removeUser, addProfile } = userSlice.actions;
export default userSlice.reducer;
