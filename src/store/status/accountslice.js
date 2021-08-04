import { createSlice } from "@reduxjs/toolkit";

export const accountSlice = createSlice({
  name: "account",
  initialState: {
    Contract: null,
    AccountAddress: null,
  },
  reducers: {
    setContract: (state, action) => {
      state.Contract = action.payload;
    },
    setAddress: (state, action) => {
      state.AccountAddress = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setContract, setAddress } = accountSlice.actions;

export default accountSlice.reducer;
