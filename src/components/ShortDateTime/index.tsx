import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { formatDate } from "../../utils/formatDateTime";
import { truncatedTextStyle } from "../../utils/truncatedTextStyle";

type ShortDateTimeProps = {
  time?: string | null | undefined;
  size?: "sm" | "md";
};

const ShortDateTime: React.FC<ShortDateTimeProps> = ({ time, size = "sm" }) => {
  const useStyles = makeStyles(({ palette: { text } }) => ({
    time: {
      color: text.primary,
      fontSize: size === "md" ? "0.9rem" : "0.8rem",
      opacity: 0.6,
      ...truncatedTextStyle(),
      margin: size === "md" ? "0.4rem 0" : 0,
    },
  }));
  const classes = useStyles();
  return (
    <Typography className={classes.time}> · {formatDate(time)}</Typography>
  );
};

export { ShortDateTime };
