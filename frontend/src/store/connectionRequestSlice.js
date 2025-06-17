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
    removeConnectionRequest: (state, action) => {
      return null;
    },
  },
});

export const { addConnections, addRequests, removeConnectionRequest } =
  connectionRequestSlice.actions;

export default connectionRequestSlice.reducer;
