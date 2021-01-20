import { CircularProgress, CircularProgressProps } from "@material-ui/core";
import React from "react";
import { useStyles } from "./styles";

type CircularProgressBarProps = {} & CircularProgressProps;

const CircularProgressBar: React.FC<CircularProgressBarProps> = (props) => {
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
