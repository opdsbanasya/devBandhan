import { configureStore } from "@reduxjs/toolkit";
import signupSlice from "./signupDataSlice";
import userSliceReducer from "./userSlice";

const appStore = configureStore({
  reducer: {
    signupData: signupSlice,
    user: userSliceReducer,
  },
});

export default appStore;
