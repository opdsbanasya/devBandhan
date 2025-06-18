import { createSlice } from "@reduxjs/toolkit";

const connectionRequestSlice = createSlice({
  name: "connection-request",
  initialState: {
    connections: null,
    requests: null,
  },
  reducers: {
    addConnections: (state, action) => {
      state.connections = action.payload;
    },
    addRequests: (state, action) => {
      state.requests = action.payload;
    },
    removeRequest: (state, action) => {
      state.requests =  state.requests.filter(req => req._id !== action.payload);
    },
  },
});

export const { addConnections, addRequests, removeRequest } =
  connectionRequestSlice.actions;

export default connectionRequestSlice.reducer;
