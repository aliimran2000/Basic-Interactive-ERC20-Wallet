import React, { useEffect, useState, useLayoutEffect } from "react";
import Web3 from "web3";
import { makeStyles } from "@material-ui/core/styles";
//import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import coin from "./resources/coin.png";
import { useDispatch, useSelector } from "react-redux";
import { init_BlockchainArtifacts } from "./store/status/Blockchainslice";
//import { useState } from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
const useStyles = makeStyles((theme) => ({
  ButtonRoot: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
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
  const BlockChain = useSelector((state) => state.BlockChain);
  const [Account, setAccount] = useState(0);

  const GetAccountInfo = async () => {
    if (Account === 0 || Account === null) {
      try {
        window.ethereum.enable().then((val) => {
          setAccount(val);
        });
      } catch (error) {
        setAccount(null);
      }
    }
  };

  useEffect(() => {
    async function initilize_blockchain() {
      new Promise((resolve, reject) => {
        dispatch(init_BlockchainArtifacts());
        resolve();
      });
    }

    initilize_blockchain();
    GetAccountInfo();
  }, [Account]);

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
            {BlockChain.Contract !== null
              ? BlockChain.Contract.options.address
              : "awaiting data"}
          </Typography>
          <Typography variant="h4" className={classes.text}>
            {Account !== 0 ? Account : "Not found"}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Card>
            {status.approved === "true" ? "connected" : "not connected"}
          </Card>
        </Grid>

        <Grid item xs={12}>
          <ButtonGroup
            variant="contained"
            color="primary"
            aria-label="contained primary button group"
          >
            <Button>Top Up</Button>
            <Button>Send Ether</Button>
            <Button>Disconnected</Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
