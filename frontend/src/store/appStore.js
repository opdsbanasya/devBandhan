import { configureStore } from "@reduxjs/toolkit";
import signupSlice from "./signupDataSlice";

const appStore = configureStore({
  reducer: {
    signupData: signupSlice,
  },
});

export default appStore;
