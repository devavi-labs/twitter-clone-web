import React from "react";
import { Snackbar, SnackbarProps, Grow } from "@material-ui/core";
import { useStyles } from "./styles";
import { useToast } from "../../hooks";

type ToastProps = SnackbarProps;

const Toast: React.FC<ToastProps> = (props) => {
  const classes = useStyles();

  const [toastProps] = useToast();

  return (
    <Snackbar
      classes={{ root: classes.root }}
      {...props}
      {...toastProps}
      TransitionComponent={Grow}
      autoHideDuration={4000}
    />
  );
};

export { Toast };
