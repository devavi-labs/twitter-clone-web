import React from "react";
import { makeStyles, Typography, ButtonProps } from "@material-ui/core";
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
      <Typography color="textPrimary" className={classes.buttonText}>
        Sign up
      </Typography>
    </RoundedButton>
  );
};
