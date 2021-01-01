import React from "react";
import { Typography, ButtonProps } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { RoundedButton } from ".";

export const LoginButton: React.FC<ButtonProps> = (props) => {
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
      variant="outlined"
      color="primary"
      className={classes.button}
      disableElevation
      fullWidth
      {...props}
    >
      <Typography className={classes.buttonText}>Log in</Typography>
    </RoundedButton>
  );
};
