import { BoxProps, Link, Typography } from "@material-ui/core";
import React from "react";
import { BiBadgeCheck } from "react-icons/bi";
import { Link as RouteLink } from "react-router-dom";
import { useStyles } from "./styles";

export type DisplayNameProps = {
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
  const classes = useStyles({ direction, size });

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
