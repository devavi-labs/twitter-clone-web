import React from "react";
import { Typography, ButtonProps } from "@material-ui/core";
import { RoundedButton } from "..";
import { useStyles } from "./styles";

export const SignupButton: React.FC<ButtonProps> = (props) => {
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
