import { Typography } from "@material-ui/core";
import React from "react";
import { AiOutlineFrown } from "react-icons/ai";
import { useStyles } from "./styles";

type EmptyDataDisplayProps = {
  title?: string;
  message?: string;
};

const EmptyDataDisplay: React.FC<EmptyDataDisplayProps> = ({
  title = "Nothing to see here.",
  message = "There's nothing we could find that would fit here.",
}) => {
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
