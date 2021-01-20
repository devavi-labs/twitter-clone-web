import { Typography } from "@material-ui/core";
import React from "react";
import { MdErrorOutline } from "react-icons/md";
import { RiSignalWifiErrorLine } from "react-icons/ri";
import { useStyles } from "./styles";

type ErrorDisplayProps = {
  error?: "network" | "other" | null;
};

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {error && error === "network" ? (
        <RiSignalWifiErrorLine className={classes.icon} />
      ) : (
        <MdErrorOutline className={classes.icon} />
      )}
      <Typography className={classes.text}>
        {error && error === "network"
          ? "Looks like you lost your connection. Please check it and try again."
          : "Some error occured. Please try again after sometime."}
      </Typography>
    </div>
  );
};

export { ErrorDisplay };
