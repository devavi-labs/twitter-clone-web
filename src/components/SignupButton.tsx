import React from "react";
import { Typography, ButtonProps } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { RoundedButton } from ".";

export const SignupButton: React.FC<ButtonProps> = (props) => {
  const useStyles = makeStyles({
    button: {
      margin: "0.4rem 0",
    },
    buttonText: {
      fontWeight: "bold",
    },
  });
  const classes = useStyles();
  return (
    <RoundedButton
      variant="contained"
      color="primary"
      className={classes.button}
      disableElevation
      fullWidth
      {...props}
    >
      <Typography className={classes.buttonText}>Sign up</Typography>
    </RoundedButton>
  );
};
