import { createSlice } from "@reduxjs/toolkit";

export const statusSlice = createSlice({
  name: "status",
  initialState: {
    metmask: false,
    approved: false,
  },
  reducers: {
    setMetmask: (state, action) => {
      state.metmask = action.payload;
    },
    setApproved: (state, action) => {
      state.approved = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMetmask, setApproved } = statusSlice.actions;

export default statusSlice.reducer;
