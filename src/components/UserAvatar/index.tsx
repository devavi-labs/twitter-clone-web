import { Avatar, IconButton, IconButtonProps } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { RegularUserFragment } from "../../generated/graphql";

type UserAvatarProps = {
  user?: RegularUserFragment | null;
  variant?: "contained" | "open" | "reply" | "replying-to";
};

const UserAvatar: React.FC<UserAvatarProps & IconButtonProps> = ({
  user,
  variant = "contained",
  ...props
}) => {
  const useStyles = makeStyles(() => ({
    avatarButton: {
      padding: 0,
      margin: 0,
      "&:hover": {
        opacity: 0.8,
      },
      "&:focus": {
        opacity: 0.8,
      },
    },
    avatar: {
      width: variant === "open" ? 52 : variant === "contained" ? 48 : 42,
      height: variant === "open" ? 52 : variant === "contained" ? 48 : 42,
      marginRight: variant === "open" ? "0.5rem" : 0,
    },
  }));
  const classes = useStyles();

  return (
    <>
      <IconButton className={classes.avatarButton} disableRipple {...props}>
        <Avatar
          src={user?.displayPicture}
          alt={user?.displayName}
          className={classes.avatar}
        />
      </IconButton>
    </>
  );
};

export { UserAvatar };
