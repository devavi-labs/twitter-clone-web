import {
  Button,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
} from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import { DisplayName, FollowButton, UserAvatar } from "..";
import { RegularUserFragment } from "../../generated/graphql";
import { useStyles } from "./styles";

type UserListItemProps = {
  user: RegularUserFragment | null | undefined;
};

const UserListItem: React.FC<UserListItemProps> = ({ user }) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <ListItem
      component={Button}
      className={classes.listItem}
      onClick={() => history.push(`/${user?.username}`)}
    >
      <ListItemIcon>
        <UserAvatar user={user} />
      </ListItemIcon>
      <DisplayName
        displayName={user?.displayName}
        username={user?.username}
        verified={user?.isVerified}
        size="sm"
        direction="vertical"
        link={false}
      />
      <ListItemSecondaryAction>
        <FollowButton user={user || null} />
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export { UserListItem };
