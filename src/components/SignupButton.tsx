import React from "react";
import { Button, makeStyles, Typography } from "@material-ui/core";

export const SignupButton = () => {
  const useStyles = makeStyles({
    button: {
      borderRadius: "1000px",
      margin: "0.4rem 0",
      textTransform: "unset",
      padding: "0.6em",
    },
    buttonText: {
      color: "white",
      fontWeight: "bold",
    },
  });
  const classes = useStyles();
  return (
    <Button
      variant="contained"
      color="primary"
      className={classes.button}
      disableElevation
      fullWidth
    >
      <Typography color="textPrimary" className={classes.buttonText}>
        Sign up
      </Typography>
    </Button>
  );
};
