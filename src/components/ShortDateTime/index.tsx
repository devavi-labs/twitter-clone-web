import { Typography } from "@material-ui/core";
import React from "react";
import { formatDate } from "../../utils/formatDateTime";
import { useStyles } from "./styles";

export type ShortDateTimeProps = {
  time?: string | null | undefined;
  size?: "sm" | "md";
};

const ShortDateTime: React.FC<ShortDateTimeProps> = ({ time, size = "sm" }) => {
  const classes = useStyles({ size });
  return (
    <Typography className={classes.time}> · {formatDate(time)}</Typography>
  );
};

export { ShortDateTime };
