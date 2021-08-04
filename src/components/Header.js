import React, { useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { setMetmask, setApproved } from "../store/status/statusslice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appbarstyles: {
    background: "linear-gradient(45deg, #08CA02 15%,#080402 90%)",
    boxShadow: "0 2px 4px 1px rgb(28,122,0)",
  },
  connectButton: {
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
  },
  installMetaMaskBtn: {
    marginRight: theme.spacing(2),
    background: "linear-gradient(45deg, #1b57a1 30%, #ca17d4 90%)",
    boxShadow: "0 3px 5px 2px rgba(112, 136, 181)",
    borderRadius: 60,
    border: 0,
    color: "white",
    height: 35,
    fontSize: 15,
    padding: "0 30px",
    "&:hover": {
      background: "linear-gradient(45deg,  #ca17d4 30%,#1059e0 90%)",
    },
  },
  connectedButton: {
    marginRight: theme.spacing(2),
    background: "linear-gradient(45deg, #02a11f 30%, #7ddb8e 90%)",
    boxShadow: "0 3px 5px 2px rgba(34, 212, 11)",
    borderRadius: 60,
    border: 0,
    color: "white",
    height: 35,
    fontSize: 15,
    padding: "0 30px",
    "&:hover": {
      background: "linear-gradient(45deg, #7ddb8e 30%,#02a11f 90%)",
    },
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Header() {
  const classes = useStyles();
  let status = useSelector((state) => state.status);
  let oldStatus = status;
  const dispatch = useDispatch();
  const [Done, setDone] = useState(0);

  function checkforupdates() {
    if (oldStatus !== status) {
      oldStatus = status;
      setDone(false);
    }
  }

  const ConnectToBrowserInstance = async function () {
    if (typeof window.ethereum !== "undefined") {
      dispatch(setMetmask("true"));
      try {
        window.ethereum.enable().then(async () => {
          dispatch(setApproved("true"));
        });
      } catch (e) {
        dispatch(setMetmask("true"));
      }
    } else {
      alert("You have to install MetaMask to continue");
    }
  };

  // const CreateContract= async function (){
  // };

  useEffect(() => {
    ConnectToBrowserInstance();
    setDone();
  }, []);

  return (
    <div className={classes.root}>
      {console.log(setInterval(checkforupdates(), 100))}
      <AppBar className={classes.appbarstyles} position="relative">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h4" className={classes.title}>
            Ali's Custom Wallet
          </Typography>

          {status.metmask === "true" ? (
            [
              status.approved === "true" ? (
                <Button
                  variant="contained"
                  className={classes.connectedButton}
                  disabled
                >
                  Connected
                </Button>
              ) : (
                <Button
                  variant="contained"
                  className={classes.connectButton}
                  onClick={async () =>
                    await window.ethereum.send("eth_requestAccounts")
                  }
                >
                  Connect
                </Button>
              ),
            ]
          ) : (
            <Button
              variant="contained"
              className={classes.installMetaMaskBtn}
            >
              Install MetaMask
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
