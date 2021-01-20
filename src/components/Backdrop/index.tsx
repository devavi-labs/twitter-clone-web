import { Backdrop as MuiBackdrop, BackdropProps } from "@material-ui/core";
import React from "react";
import { useStyles } from "./styles";

export const Backdrop: React.FC<BackdropProps> = (props) => {
  const classes = useStyles();

  return <MuiBackdrop className={classes.root} {...props} />;
};
