import React from "react";
import { Backdrop as MuiBackdrop, BackdropProps } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

export const Backdrop:React.FC<BackdropProps> = (props) => {
  const classes = useStyles();

    return <MuiBackdrop className={classes.root} {...props}/>;
};

const useStyles = makeStyles(({ palette: { primary, text, type } }) => ({
  root: {
    backgroundColor: `${
      type === "dark" ? primary.light : text.primary
    } !important`,
    opacity: "0.2 !important",
  },
}));
