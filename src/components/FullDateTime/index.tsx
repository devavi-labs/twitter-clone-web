import { Typography } from "@material-ui/core";
import React from "react";
import { formatDate, formatTime } from "../../utils/formatDateTime";
import { useStyles } from "./styles";

export type FullDateTimeProps = {
  time?: string | null | undefined;
  size?: "sm" | "md";
};

const FullDateTime: React.FC<FullDateTimeProps> = ({ time, size = "sm" }) => {
  const classes = useStyles({ size });
  return (
    <Typography className={classes.time}>
      {formatTime(time)}
      {" · "}
      {formatDate(time, false)}
    </Typography>
  );
};

export { FullDateTime };
