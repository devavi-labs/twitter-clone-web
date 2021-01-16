import { BoxProps, Link, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { BiBadgeCheck } from "react-icons/bi";
import { Link as RouteLink } from "react-router-dom";
import { truncatedTextStyle } from "../../utils/truncatedTextStyle";

type DisplayNameProps = {
  displayName?: string | null | undefined;
  username?: string | null | undefined;
  verified?: boolean | null | undefined;
  size?: "xs" | "sm" | "md" | "lg";
  direction?: "vertical" | "horizontal";
  link?: boolean | null | undefined;
};

const DisplayName: React.FC<DisplayNameProps & BoxProps> = ({
  displayName,
  username,
  verified = false,
  size = "sm",
  direction = "horizontal",
  link = true,
  ...props
}) => {
  const useStyles = makeStyles(({ palette: { text, primary, type } }) => ({
    names: {
      display: "flex",
      flexDirection: direction === "vertical" ? "column" : "row",
      alignItems: direction === "vertical" ? "flex-start" : "center",
      gap: direction === "vertical" ? 0 : "0.2rem",
    },
    primaryText: {
      color: text.primary,
      opacity: 0.9,
      fontSize:
        size === "xs"
          ? "0.8rem"
          : size === "sm"
          ? "0.9rem"
          : size === "md"
          ? "1rem"
          : "1.2rem",
      fontWeight: "bold",
      ...truncatedTextStyle(),
    },
    verifiedBadge: {
      marginLeft: "0.2rem",
      color: type === "dark" ? text.primary : primary.main,
      fontSize:
        size === "xs"
          ? "1.1rem"
          : size === "sm"
          ? "1.2rem"
          : size === "md"
          ? "1.3rem"
          : "1.4rem",
    },
    secondaryText: {
      color: text.secondary,
      fontSize:
        size === "xs"
          ? "0.75rem"
          : size === "sm"
          ? "0.8rem"
          : size === "md"
          ? "0.9rem"
          : "0.95rem",
      ...truncatedTextStyle(),
    },
  }));
  const classes = useStyles();

  return (
    <div className={classes.names}>
      {link ? (
        <Link
          component={RouteLink}
          to={`/${username}`}
          className={classes.primaryText}
          {...props}
        >
          {displayName}
          {verified && <BiBadgeCheck className={classes.verifiedBadge} />}
        </Link>
      ) : (
        <div className={classes.primaryText} {...props}>
          {displayName}
          {verified && <BiBadgeCheck className={classes.verifiedBadge} />}
        </div>
      )}
      {username && (
        <Typography className={classes.secondaryText}>@{username}</Typography>
      )}
    </div>
  );
};

export { DisplayName };
