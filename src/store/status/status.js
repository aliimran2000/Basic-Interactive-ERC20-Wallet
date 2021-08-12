import { configureStore } from "@reduxjs/toolkit";
import statusReducer from "./statusslice";
import AccountsReducer from "./Accountslice";

export default configureStore({
  reducer: {
    status: statusReducer,
    AccountSlice: AccountsReducer,
  },
});
