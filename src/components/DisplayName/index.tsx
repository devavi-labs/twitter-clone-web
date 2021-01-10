import { BoxProps, Link, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { BiBadgeCheck } from "react-icons/bi";
import { truncatedTextStyle } from "../../utils/truncatedTextStyle";

type DisplayNameProps = {
  displayName?: string | null | undefined;
  username?: string | null | undefined;
  verified?: boolean | null | undefined;
  size?: "xs" | "sm" | "md";
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
      fontSize: size === "xs" ? "0.8rem" : size === "sm" ? "0.9rem" : "1rem",
      fontWeight: "bold",
      ...truncatedTextStyle(),
    },
    verifiedBadge: {
      marginLeft: "0.2rem",
      color: type === "dark" ? text.primary : primary.main,
      fontSize: size === "xs" ? "1.1rem" : size === "sm" ? "1.2rem" : "1.3rem",
    },
    secondaryText: {
      color: text.secondary,
      fontSize: size === "xs" ? "0.75rem" : size === "sm" ? "0.8rem" : "0.9rem",
      ...truncatedTextStyle(),
    },
  }));
  const classes = useStyles();

  const C = link ? Link : "div";

  return (
    <div className={classes.names}>
      <C className={classes.primaryText} href={`/${username}`} {...props}>
        {displayName}
        {verified && <BiBadgeCheck className={classes.verifiedBadge} />}
      </C>

      <Typography className={classes.secondaryText}>@{username}</Typography>
    </div>
  );
};

export { DisplayName };
