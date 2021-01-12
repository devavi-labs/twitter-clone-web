import { CircularProgress, CircularProgressProps } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

type CircularProgressBarProps = {} & CircularProgressProps;

const CircularProgressBar: React.FC<CircularProgressBarProps> = (props) => {
  const useStyles = makeStyles(({ palette: { primary, text } }) => ({
    root: {
      position: "relative",
    },
    bottom: {
      color: primary.dark,
      opacity: 0.4,
      transition: "all 100ms ease-in",
    },
    top: {
      position: "absolute",
      left: 0,
      transition: "all 100ms ease-in",
      color: primary.main,
    },
  }));

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CircularProgress
        variant="determinate"
        value={100}
        className={classes.bottom}
        size={24}
        thickness={5}
        {...props}
      />
      <CircularProgress
        className={classes.top}
        size={24}
        thickness={5}
        {...props}
      />
    </div>
  );
};

export { CircularProgressBar };
