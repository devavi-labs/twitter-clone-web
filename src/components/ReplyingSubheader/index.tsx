import { Link, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { truncatedTextStyle } from "../../utils/truncatedTextStyle";

type ReplyingSubheaderProps = {
  username?: string | null | undefined;
  size?: "xs" | "sm" | "md";
};

const ReplyingSubheader: React.FC<ReplyingSubheaderProps> = ({
  username,
  size,
}) => {
  const useStyles = makeStyles(({ palette: { text, primary, type } }) => ({
    root: {
      color: text.secondary,
      fontSize: size === "xs" ? "0.75rem" : size === "sm" ? "0.8rem" : "0.9rem",
      ...truncatedTextStyle(),
    },
    username: {
      color: primary.main,
      fontWeight: "bold",
      opacity: "1 !important",
    },
  }));
  const classes = useStyles();

  return (
    <Typography className={classes.root}>
      Replying to{" "}
      <Link className={classes.username} href={`/${username}`}>
        @{username}
      </Link>
    </Typography>
  );
};

export { ReplyingSubheader };
