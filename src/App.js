import React, { useEffect, useState } from "react";
import Web3 from "web3";
import { makeStyles } from "@material-ui/core/styles";
//import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import coin from "./resources/coin.png";
import { useDispatch, useSelector } from "react-redux";
import { setAddress, setContract } from "./store/status/accountslice";
//import { useState } from "react";
import { ABI } from "./resources/abi";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: "linear-gradient(45deg, #08CAB2 15%,#080402 90%)",
    minHeight: "100vh",
  },
  walletcard: {
    minWidth: 345,
    backgroundColor: "#F18B54",
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontFamily: "Raleway",
  },
}));

function App() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const status = useSelector((state) => state.status);
  const Account = useSelector((state) => state.Account);
  
  var web3 = new Web3("http://localhost:8545");
  const setupBlockChainConnection = async () => {
    if (status.metmask === "true") {
      let ContractObj = await new web3.eth.Contract(
        ABI,
        "0x12bACd9F9e2AC345646C31356A522F83eE234c98"
      );

      dispatch(setContract(ContractObj));
      dispatch(setAddress(ContractObj.options.address));

      console.log("Account 2 : ", Account);
    }
  };

  useEffect(() => {
    setupBlockChainConnection();
  }, []);

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={2}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{
          margin: 0,
          width: "100%",
        }}
      >
        <Grid item xs={12} style={{ justifyContent: "center" }}>
          <img src={coin} alt="Logo" width="150" height="150" />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h3" className={classes.text}>
            Ali's Wallet
          </Typography>
          <Typography variant="h5" className={classes.text}>
            {Account.Adress}
          </Typography>
          <Typography variant="h5" className={classes.text}>
            {web3.eth.getBalance(Account.Adress)}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Card>
            {status.approved === "true" ? "connected" : "not connected"}
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
