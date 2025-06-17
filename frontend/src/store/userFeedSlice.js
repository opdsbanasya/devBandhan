import { createSlice } from "@reduxjs/toolkit";

const userFeedSlice = createSlice({
  name: "userFeed",
  initialState: null,
  reducers: {
    addFeedData: (state, action) => {
      return action.payload;
    },
    removeFeedData: (state, action) => {
      return null;
    },
    removeUserFromFeed: (state, action) => {
      return state.filter((user) => user._id !== action.payload);
    },
  },
});

export const { addFeedData, removeFeedData, removeUserFromFeed } = userFeedSlice.actions;

export default userFeedSlice.reducer;
