import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import coin from "./resources/coin.png";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useSelector } from "react-redux";
import { Contract_Address } from "./resources/address";

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
  SignButton: {
    marginTop: 3,
    marginRight: theme.spacing(2),
    background: "linear-gradient(45deg, #f2ee02 30%, #0a0a0a 90%)",
    boxShadow: "0 3px 5px 2px rgba(219, 200, 55) ",
    borderRadius: 60,
    border: 0,
    color: "white",
    height: 35,
    fontSize: 10,
    padding: "0 30px",
    "&:hover": {
      background: "linear-gradient(45deg, #0a0a0a 30%,#f2ee02 90%)",
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
  const classes = useStyles();
  let AccountSlice = useSelector((AccountSlice) => AccountSlice.AccountSlice);
  let status = useSelector((state) => state.status);
  const [Account, setAccount] = useState(null);
  const [ButtonAction, setButton] = useState(0);
  const [transaction, setTransStat] = useState(0);
  const [Amount, setAmount] = useState("0");
  const [TransactionAddress, setTrxAddr] = useState("");
  const [oldaddress, setoldAddress] = useState(AccountSlice.AccountAddress);

  const GetBalance = async (addr) => {
    return props.Contract.methods.balanceOf(addr).call();
  };

  const HasChanged = () => {
    if (oldaddress !== AccountSlice.AccountAddress) {
      GetBalance(AccountSlice.AccountAddress)
        .then((_balance) => {
          setoldAddress(AccountSlice.AccountAddress);
          setAccount({
            address: AccountSlice.AccountAddress,
            balance: _balance,
          });
        })
        .catch((err) => {
          console.log("error getting balance");
        });
    }
  };

  const SignTransaction = async () => {
    try {
      await props.Contract.methods
        .transfer(TransactionAddress, Amount)
        .send({ from: Account.address });
    } 
    catch(err) {
      console.log(err)
      //alert("Transaction Cancelled");
      setButton(0);
      setTransStat(0);
      setTrxAddr(0);
      setAmount(0);
    }
  };

  const VerifyTransaction = async () => {
    console.log("STARTED");

    let OK = props.web3obj.utils.isAddress(TransactionAddress);

    if (TransactionAddress === Account.address || !OK) {
      return;
    }
    console.log("Address Validated");
    if ((parseInt(Amount) || parseFloat(Amount)) && Amount >= 0) {
      console.log("Amount Validated");
      setTransStat(1);
    } else {
      console.log("Amount Invalid");
    }
  };

  const GetData = async () => {
    if (
      props.web3obj !== null &&
      window.ethereum.isConnected() === true &&
      status.approved === "true"
    ) {
      console.log("getdata called");
      GetBalance(AccountSlice.AccountAddress)
        .then((_balance) => {
          setAccount({
            address: AccountSlice.AccountAddress,
            balance: _balance,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const TransactionButton = (val) => {
    switch (val) {
      case 1:
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Typography variant="caption" align="center" marginBottom={2}>
              The transaction has to be signed with your private key
            </Typography>

            <Button
              className={classes.SignButton}
              onClick={() => {
                SignTransaction();
              }}
            >
              Sign Transaction
            </Button>
          </div>
        );
      case 2:
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Typography variant="outline" align="center" marginBottom={2}>
              The tranction was succesfull
            </Typography>
          </div>
        );

      default:
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
        return (
          <Card
            style={{
              alignItems: "center",
              justifyContent: "center",
              minWidth: 400,
              direction: "column",
            }}
          >
            <CardHeader title="Top Up Wallet" subheader="Request A Top Up" />
            <CardContent>
              <TextField
                fullWidth
                required
                onChange={(event) => {
                  setAmount(event.target.value);
                }}
                label="Enter Amount to Top Up"
              />

              <CardContent
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Button
                  color="primary"
                  variant="contained"
                  onClick={async () => {
                    try {
                      console.log(
                        Account.address,
                        "sending",
                        Amount,
                        props.web3obj.utils.toWei(Amount)
                      );

                      await props.Contract.methods.TopUp().send({
                        from: Account.address,
                        value: props.web3obj.utils.toWei(Amount).toString(),
                        to: Contract_Address,
                      });

                      console.log(" Approved transaction");
                    } catch (err) {
                      console.log(err);
                      alert("Transaction Cancelled");
                      console.log("clicked");
                      setButton(0);
                      setTransStat(0);
                      setTrxAddr(0);
                      setAmount(0);
                    }
                  }}
                >
                  Confirm Top Up
                </Button>
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={() => {
                    console.log("clicked");
                    setButton(0);
                    setTransStat(0);
                    setTrxAddr(0);
                    setAmount(0);
                  }}
                >
                  Cancel Top Up
                </Button>
              </CardContent>
            </CardContent>
          </Card>
        );

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
              title="Transfer Tokens "
              subheader="Payment will have to be signed before transaction"
            />

            <CardContent>
              {transaction === 0 ? (
                <TextField
                  fullWidth
                  required
                  onChange={(event) => {
                    setAmount(event.target.value);
                  }}
                  label="Enter Amount"
                />
              ) : (
                <TextField disabled fullWidth required label="Enter Amount" />
              )}
            </CardContent>
            <CardContent>
              {transaction === 0 ? (
                <TextField
                  fullWidth
                  required
                  onChange={(event) => {
                    setTrxAddr(event.target.value);
                  }}
                  label="Enter Reciever Address"
                />
              ) : (
                <TextField
                  disabled
                  fullWidth
                  required
                  label="Enter Reciever Address"
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
              <Button
                color="secondary"
                variant="contained"
                onClick={() => {
                  console.log("clicked");
                  setButton(0);
                  setTransStat(0);
                  setTrxAddr(0);
                  setAmount(0);
                }}
              >
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
    //setTimeout(() => {
    GetData();
    //},1000);
  }, []);

  return (
    <div className={classes.root}>
      {AccountSlice.AccountAddress === null ? (
        <CircularProgress />
      ) : (
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
          {setInterval(HasChanged, 750)};
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
              {Account !== null ? Account.address : "Connecting..."}
            </Typography>

            <Typography
              variant="h5"
              className={classes.text}
              style={{ justifyContent: "center" }}
            >
              {Account !== null
                ? Account.balance + " Alii Tokens"
                : "Connecting..."}
            </Typography>
            <Typography variant="h4" className={classes.text}></Typography>
          </Grid>
          {Account !== null ? (
            <Grid item xs={12}>
              <Button
                className={classes.WorkingButtons}
                onClick={() => {
                  setButton(1);
                  setAmount(0.0);
                  setTransStat(0);
                }}
              >
                Top Up
              </Button>
              <Button
                className={classes.WorkingButtons}
                onClick={() => {
                  setButton(2);
                  setAmount(0.0);
                  setTransStat(0);
                }}
              >
                Transfer Tokens
              </Button>
              <Button
                className={classes.WorkingButtons}
                onClick={() => {
                  setButton(3);
                  setAmount(0.0);
                  setTransStat(0);
                }}
              >
                Disconnect Wallet
              </Button>
            </Grid>
          ) : null}
          <Grid item xs={12}>
            {displayAction(ButtonAction)}
          </Grid>
        </Grid>
      )}
    </div>
  );
}

export default App;
