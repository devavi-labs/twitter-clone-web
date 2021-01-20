import {
  Avatar,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import React from "react";
import { BsSearch, BsX } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import { RoundedButton } from "..";
import { useConfirmDialog, useRecentSearches } from "../../hooks";
import { useStyles } from "./styles";

const RecentSearches: React.FC = () => {
  const classes = useStyles();
  const [, { handleOpen }] = useConfirmDialog();
  const [
    state,
    { removeRecentSearch, clearRecentSearches },
  ] = useRecentSearches();
  const history = useHistory();

  const handleClearAll = () => {
    return handleOpen({
      title: "Clear all recent searches?",
      content:
        "This can’t be undone and you’ll remove all your recent searches.",
      confirmLabel: "Clear",
      onConfirm: clearRecentSearches,
    });
  };

  return (
    <div>
      <div className={classes.header}>
        <h2>Recent</h2>
        <RoundedButton color="primary" size="small" onClick={handleClearAll}>
          Clear All
        </RoundedButton>
      </div>
      <List>
        {state.searches?.map((search, index) => (
          <ListItem
            key={index}
            component={Button}
            className={classes.listItem}
            onClick={() => history.push(`/search?q=${search}&src=typed_query`)}
          >
            <ListItemAvatar>
              <Avatar>
                <BsSearch />
              </Avatar>
            </ListItemAvatar>
            <ListItemText>{search}</ListItemText>
            <ListItemSecondaryAction>
              <IconButton onClick={() => removeRecentSearch(search)}>
                <BsX />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export { RecentSearches };
