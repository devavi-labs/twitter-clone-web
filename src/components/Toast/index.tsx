import React from "react";
import { Snackbar, SnackbarProps, Grow } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

type ToastProps = SnackbarProps;

const Toast: React.FC<ToastProps> = (props) => {
  const useStyles = makeStyles(({ palette: { primary } }) => ({
    root: {
      "& > .MuiSnackbarContent-root": {
        backgroundColor: primary.main,
        color: "#fff",
        fontWeight: "bold",
      },
    },
  }));
  const classes = useStyles();
  return (
    <Snackbar
      classes={{ root: classes.root }}
      {...props}
      TransitionComponent={Grow}
      autoHideDuration={4000}
    />
  );
};

export { Toast };
