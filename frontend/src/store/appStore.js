import { configureStore } from "@reduxjs/toolkit";
import signupSlice from "./signupDataSlice";
import userSliceReducer from "./userSlice";
import userFeedReducer from "./userFeedSlice";

const appStore = configureStore({
  reducer: {
    signupData: signupSlice,
    user: userSliceReducer,
    feed: userFeedReducer
  },
});

export default appStore;
