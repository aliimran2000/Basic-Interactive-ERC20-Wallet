import { createSlice } from "@reduxjs/toolkit";


export const AccountSlice = createSlice({
  name: "AccountSlice",
  initialState: {
    AccountAddress: null,
  },
  reducers: {
    setAccountAddress: (state, action) => {
      state.AccountAddress = action.payload;
    },

  },
});

// Action creators are generated for each case reducer function
export const { setAccountAddress} =
  AccountSlice.actions;

export default AccountSlice.reducer;
