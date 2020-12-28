import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import { RoundedButton } from ".";

interface SignupButtonProps {
  onClick?: () => any;
}

export const SignupButton: React.FC<SignupButtonProps> = ({
  onClick = () => null,
}) => {
  const useStyles = makeStyles({
    button: {
      margin: "0.4rem 0",
    },
    buttonText: {
      color: "white",
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
      onClick={onClick}
    >
      <Typography color="textPrimary" className={classes.buttonText}>
        Sign up
      </Typography>
    </RoundedButton>
  );
};
