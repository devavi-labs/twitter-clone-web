import { ButtonProps, Typography } from "@material-ui/core";
import React from "react";
import { RoundedButton } from "..";
import { useStyles } from "./styles";

export const LoginButton: React.FC<ButtonProps> = (props) => {
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
