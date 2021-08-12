import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Header from "./components/Header";
import { Provider } from "react-redux";
import store from "./store/status/status";
import { ABI } from "./resources/abi";
import { Contract_Address } from "./resources/address";
import Web3 from "web3";

let web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
let Contract = new web3.eth.Contract(ABI, Contract_Address);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Header />
      <App web3obj={web3} Contract={Contract} />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
