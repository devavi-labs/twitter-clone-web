import { Link, Typography } from "@material-ui/core";
import React from "react";
import { Link as RouteLink } from "react-router-dom";
import { useStyles } from "./styles";

export type ReplyingSubheaderProps = {
  username?: string | null | undefined;
  size?: "xs" | "sm" | "md";
};

const ReplyingSubheader: React.FC<ReplyingSubheaderProps> = ({
  username,
  size,
}) => {
  const classes = useStyles({ size });

  return (
    <Typography className={classes.root}>
      Replying to{" "}
      <Link
        component={RouteLink}
        className={classes.username}
        to={`/${username}`}
      >
        @{username}
      </Link>
    </Typography>
  );
};

export { ReplyingSubheader };
