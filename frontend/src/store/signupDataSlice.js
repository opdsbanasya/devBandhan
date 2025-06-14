import { createSlice } from "@reduxjs/toolkit";

const signupDataSlice = createSlice({
  name: "signup",
  initialState: {
    isContinue: false,
    signupData: null,
  },
  reducers: {
    addData: (state, action) => {
      state.signupData = { ...state.signupData, ...action.payload };
    },
  },
});

export const { addData } = signupDataSlice.actions;

export default signupDataSlice.reducer;
