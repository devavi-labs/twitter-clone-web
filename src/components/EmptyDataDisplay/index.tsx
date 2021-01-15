import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { AiOutlineFrown } from "react-icons/ai";

type EmptyDataDisplayProps = {
  title?: string;
  message?: string;
};

const EmptyDataDisplay: React.FC<EmptyDataDisplayProps> = ({
  title = "Nothing to see here.",
  message = "There's nothing we could find that would fit here.",
}) => {
  const useStyles = makeStyles(({ palette: { text } }) => ({
    root: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "0.4rem",
      margin: "1rem 0",
      padding: "1rem",
      textAlign: "center",
    },
    icon: {
      fontSize: "2.5rem",
    },
    title: {
      fontSize: "1.2rem",
      fontWeight: "bold",
      color: text.primary,
      marginBottom: "0.6rem",
    },
    message: {
      fontSize: "0.9rem",
      color: text.secondary,
    },
  }));
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AiOutlineFrown className={classes.icon} />
      <Typography className={classes.title}>{title}</Typography>
      <Typography className={classes.message}>{message}</Typography>
    </div>
  );
};

export { EmptyDataDisplay };
