import {
  Button,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
} from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import { DisplayName, FollowButton, UserAvatar } from "..";
import { RegularUserFragment, useMeQuery } from "../../generated/graphql";
import { useStyles } from "./styles";

type UserListItemProps = {
  user: RegularUserFragment | null | undefined;
  onClick?: (user: RegularUserFragment | null | undefined) => void;
};

const UserListItem: React.FC<UserListItemProps> = ({ user, onClick }) => {
  const classes = useStyles();
  const history = useHistory();

  const [{ data }] = useMeQuery();

  return (
    <ListItem
      component={Button}
      className={classes.listItem}
      onClick={() =>
        onClick ? onClick(user) : history.push(`/${user?.username}`)
      }
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
      {data?.me && (
        <ListItemSecondaryAction>
          <FollowButton user={user || null} />
        </ListItemSecondaryAction>
      )}
    </ListItem>
  );
};

export { UserListItem };
