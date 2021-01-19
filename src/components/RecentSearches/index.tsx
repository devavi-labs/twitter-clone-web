import {
  Avatar,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
} from "@material-ui/core";
import { BsX, BsSearch } from "react-icons/bs";
import React from "react";
import { useStyles } from "./styles";
import { RoundedButton } from "..";
import { ConfirmDialogContext } from "../../context/confimDialog";
import { useHistory } from "react-router-dom";

type RecentSearchesProps = {
  searches: string[] | undefined;
  removeSearch: (search: string) => void;
  removeAllRecentSearches: () => void;
};

const RecentSearches: React.FC<RecentSearchesProps> = ({
  searches,
  removeSearch,
  removeAllRecentSearches,
}) => {
  const classes = useStyles();
  const { handleOpen } = React.useContext(ConfirmDialogContext)!;
  const history = useHistory();

  const handleClearAll = () => {
    return handleOpen({
      title: "Clear all recent searches?",
      content:
        "This can’t be undone and you’ll remove all your recent searches.",
      confirmLabel: "Clear",
      onConfirm: removeAllRecentSearches,
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
        {searches?.map((search, index) => (
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
              <IconButton onClick={() => removeSearch(search)}>
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
