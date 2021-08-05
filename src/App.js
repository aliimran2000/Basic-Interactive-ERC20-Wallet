import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
//import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import coin from "./resources/coin.png";
//import { useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
const useStyles = makeStyles((theme) => ({
  ButtonRoot: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  WorkingButtons: {
    marginRight: theme.spacing(2),
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    borderRadius: 60,
    border: 0,
    color: "white",
    height: 35,
    fontSize: 15,
    padding: "0 30px",
    "&:hover": {
      background: "linear-gradient(45deg, #FF8E53 30%,#FE6B8B 90%)",
    },
    minWidth: 250,
  },
  VerifyButton: {
    marginTop: 3,
    marginRight: theme.spacing(2),
    background: "linear-gradient(45deg, #22a846 30%, #5adbdb 90%)",
    boxShadow: "0 3px 5px 2px rgba(43, 224, 124) ",
    borderRadius: 60,
    border: 0,
    color: "white",
    height: 35,
    fontSize: 10,
    padding: "0 30px",
    "&:hover": {
      background: "linear-gradient(45deg, #5adbdb 30%,#22a846 90%)",
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

function App(props) {
  //const dispatch = useDispatch();
  const classes = useStyles();
  //const status = useSelector((state) => state.status);
  const [Account, setAccount] = useState(null);
  const [ButtonAction, setButton] = useState(0);
  const [transaction, setTransStat] = useState(0);
  const [Amount, setAmount] = useState(0);
  const [TransactionAddress, setTrxAddr] = useState(0);

  const VerifyTransaction = async () => {
    console.log('STARTED');
    let OK = props.web3obj.utils.isAddress((TransactionAddress));
    console.log(OK);
    if (!OK) {
      return;
    }

    console.log("PASS");

    if (
      parseInt(Amount) <=
        parseInt(props.web3obj.utils.fromWei(Account.balance, "ether")) &&
      Amount >= 0
    ) {
      setTransStat(1);
    }
  };

  const GetData = async () => {
    window.ethereum
      .request({
        method: "eth_requestAccounts",
      })
      .then(async (value) => {
        var bal = await props.web3obj.eth.getBalance(value[0]);
        if (value !== Account) {
          console.log({ address: value, balance: bal });
          setAccount({ address: value, balance: bal });
        }
      });
  };

  const TransactionButton = (val) => {
    switch (val) {
      case 1:
        //sign transaction
        return "transaction verified";
      case 2:
        //confirm transaction
        return null;

      default:
        //verify transaction
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Typography variant="caption" align="center" marginBottom={2}>
              Verify Transaction Please
            </Typography>

            <Button
              className={classes.VerifyButton}
              onClick={() => {
                VerifyTransaction();
              }}
            >
              Verify Transaction
            </Button>
          </div>
        );
    }
  };

  const displayAction = (val) => {
    switch (val) {
      case 1:
        return <Card>{"Top Up"}</Card>;
      case 2:
        return (
          <Card
            style={{
              minWidth: 400,
              alignItems: "center",
              justifyContent: "center",
              direction: "column",
            }}
          >
            <CardHeader
              title="Transfer Funds "
              subheader="Payment will have to be signed before transaction"
            />

            <CardContent>
              {transaction === 0 ? (
                <TextField
                  fullWidth
                  required
                  onChange={(event) => {
                    setTrxAddr(event.target.value);
                  }}
                  id="standard-required"
                  label="Enter Reciever Address"
                />
              ) : (
                <TextField
                  disabled
                  fullWidth
                  required
                  id="standard-required"
                  label="Enter Reciever Address"
                />
              )}
            </CardContent>

            <CardContent>
              {transaction === 0 ? (
                <TextField
                  fullWidth
                  required
                  inputProps={{ pattern: "/^0x[a-fA-F0-9]{40}$/" }}
                  onChange={(event) => {
                    setAmount(event.target.value);
                  }}
                  id="standard-required"
                  label="Enter Amount"
                />
              ) : (
                <TextField
                  disabled
                  fullWidth
                  required
                  id="standard-required"
                  label="Enter Amount"
                />
              )}
            </CardContent>
            <CardContent>{TransactionButton(transaction)}</CardContent>
            <CardContent
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button color="secondary" variant="contained">
                Cancel Transaction
              </Button>
            </CardContent>
          </Card>
        );
      case 3:
        return null;

      default:
        return null;
    }
  };

  useEffect(() => {
    GetData();
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

        <Grid item xs={12} style={{ justifyContent: "center" }}>
          <Typography
            variant="h3"
            className={classes.text}
            style={{ justifyContent: "center" }}
          >
            Ali's Wallet
          </Typography>

          <Typography
            variant="h5"
            className={classes.text}
            style={{ justifyContent: "center" }}
          >
            {Account !== null ? Account.address[0] : "Connecting..."}
          </Typography>

          <Typography
            variant="h5"
            className={classes.text}
            style={{ justifyContent: "center" }}
          >
            {Account !== null
              ? props.web3obj.utils.fromWei(Account.balance, "ether") + " ether"
              : "Connecting..."}
          </Typography>
          <Typography variant="h4" className={classes.text}></Typography>
        </Grid>

        <Grid item xs={12}>
          <Button
            className={classes.WorkingButtons}
            onClick={() => {
              setButton(1);
            }}
          >
            Top Up
          </Button>
          <Button
            className={classes.WorkingButtons}
            onClick={() => {
              setButton(2);
            }}
          >
            Send Ether
          </Button>
          <Button
            className={classes.WorkingButtons}
            onClick={() => {
              setButton(3);
              setTransStat(0);
            }}
          >
            Disconnect Wallet
          </Button>
        </Grid>

        <Grid item xs={12}>
          {displayAction(ButtonAction)}
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
