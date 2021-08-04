import { configureStore } from "@reduxjs/toolkit";
import statusReducer from './statusslice';
import accountReducer from './accountslice';


export default configureStore({
  reducer: {
    status : statusReducer,
    Account : accountReducer
  },
});

//*****************************I
// import { combineReducers } from "redux";
// const Set_MetMask = "Set_MetMask";
// const Approve_Wallet = "Approve_Wallet";

// export function setMM(statusval) {
//   return {
//     type: Set_MetMask,
//     statusval,
//   };
// }

// export function approveW(statusval) {
//   return {
//     type: Approve_Wallet,
//     statusval,
//   };
// }

// const initial_State = {
//   metmask: false,
//   approved: false,
// };

// //(previousstate, action) => newState
// //we dont mutate the object a new object is reutrned

// const reducerfunction = (state = initial_State , action) =>
// {
//   switch(action.type){
//     case setMM : return {
//       ...state ,
//       metamask: action
//     }

//     case approveW : return {
//       ...state,
//       approved: action
//     }

//     default: return state
//   }

// }

// const statusApp = combineReducers({
//   reducerfunction
// });

// export default statusApp
