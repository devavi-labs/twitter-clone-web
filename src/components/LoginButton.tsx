import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import { RoundedButton } from ".";

interface LoginButtonProps {
  onClick?: () => any;
}

export const LoginButton: React.FC<LoginButtonProps> = ({
  onClick = () => null,
}) => {
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
      onClick={onClick}
    >
      <Typography className={classes.buttonText}>Log in</Typography>
    </RoundedButton>
  );
};
