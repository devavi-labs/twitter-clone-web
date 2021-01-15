import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { MdErrorOutline } from "react-icons/md";
import { RiSignalWifiErrorLine } from "react-icons/ri";

type ErrorDisplayProps = {
  error?: "network" | "other" | null;
};

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error }) => {
  const useStyles = makeStyles(({ palette: { text } }) => ({
    root: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "1rem",
      margin: "1rem 0",
      color: text.secondary,
      padding: "1rem",
      textAlign: "center",
    },
    icon: {
      fontSize: "2.5rem",
    },
    text: {
      fontSize: "0.9rem",
    },
  }));
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
