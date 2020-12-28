import React from "react";
import { Button, makeStyles, Typography } from "@material-ui/core";

export const LoginButton = () => {
  const useStyles = makeStyles({
    button: {
      borderRadius: "1000px",
      margin: "0.4rem 0",
      textTransform: "unset",
      padding: "0.6em",
    },
    buttonText: {
      fontWeight: "bold",
    },
  });
  const classes = useStyles();
  return (
    <Button
      variant="outlined"
      color="primary"
      className={classes.button}
      disableElevation
      fullWidth
    >
      <Typography className={classes.buttonText}>Log in</Typography>
    </Button>
  );
};
