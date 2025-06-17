import { configureStore } from "@reduxjs/toolkit";
import signupSlice from "./signupDataSlice";
import userSliceReducer from "./userSlice";
import userFeedReducer from "./userFeedSlice";
import connectionRequestReudcer from "./connectionRequestSlice";

const appStore = configureStore({
  reducer: {
    signupData: signupSlice,
    user: userSliceReducer,
    feed: userFeedReducer,
    connectionRequest: connectionRequestReudcer
  },
});

export default appStore;
