import { createSlice } from "@reduxjs/toolkit";
import Web3 from "web3";
import { Contract_Address } from "../../resources/address";
import { ABI } from "../../resources/abi";

export const BlockchainSlice = createSlice({
  name: "BlockChain",
  initialState: {
    Web3Obj: null,
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
    setWeb3: (state, action) => {
      state.Web3Obj = action.payload;
    },
    init_BlockchainArtifacts: (state,action) => {
      state.Web3Obj = action.payload
      state.Contract = new state.Web3Obj.eth.Contract(ABI, Contract_Address);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setContract, setAddress, init_BlockchainArtifacts } =
  BlockchainSlice.actions;

export default BlockchainSlice.reducer;
