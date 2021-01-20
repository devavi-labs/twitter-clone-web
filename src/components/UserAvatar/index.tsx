import { Avatar, IconButton, IconButtonProps } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import { RegularUserFragment } from "../../generated/graphql";
import { useStyles } from "./styles";

export type UserAvatarProps = {
  user?: RegularUserFragment | null;
  variant?: "contained" | "open" | "reply" | "replying-to";
};

const UserAvatar: React.FC<UserAvatarProps & IconButtonProps> = ({
  user,
  variant = "contained",
  ...props
}) => {
  const classes = useStyles({ variant });

  const history = useHistory();

  return (
    <>
      <IconButton
        className={classes.avatarButton}
        disableRipple
        onClick={() => history.push(`/${user?.username}`)}
        {...props}
      >
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
