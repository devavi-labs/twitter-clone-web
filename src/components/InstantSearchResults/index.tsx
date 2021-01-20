import { Button, Divider, List, ListItem } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import { CircularProgressBar, RecentSearches, UserListItem } from "..";
import { useSearchQuery } from "../../generated/graphql";
import { useInstantSearch, useRecentSearches } from "../../hooks";
import { useStyles } from "./styles";

const InstantSearchResults: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();

  const [instantSearchState] = useInstantSearch();

  const [state, { pushSearch }] = useRecentSearches();

  const [{ data, fetching }] = useSearchQuery({
    variables: {
      query: instantSearchState.query!,
      type: "user",
      limit: 3,
    },
    pause: !instantSearchState.query,
  });

  const handleSearch = () => {
    instantSearchState.query && pushSearch(instantSearchState.query);
    instantSearchState.query &&
      history.push(`/search?q=${instantSearchState.query}&src=typed_query`);
  };

  if (fetching) {
    return (
      <div className={classes.loading}>
        <CircularProgressBar />
      </div>
    );
  }

  if (instantSearchState.query && instantSearchState.query.length > 0) {
    return (
      <React.Fragment>
        {state.searches && state.searches.length > 0 && <RecentSearches />}
        <List>
          <ListItem
            component={Button}
            className={classes.listItem}
            onClick={handleSearch}
          >
            Search for {instantSearchState.query}
          </ListItem>
          <Divider />
          {data && (
            <>
              {data.search.paginatedUsers?.users?.map((user) => (
                <UserListItem key={user?.id} user={user} />
              ))}
              <ListItem
                component={Button}
                className={classes.listItem}
                onClick={() => history.push(`/${instantSearchState.query}`)}
              >
                Go to @{instantSearchState.query}
              </ListItem>
            </>
          )}
        </List>
      </React.Fragment>
    );
  }

  if (state.searches && state.searches.length > 0) {
    return <RecentSearches />;
  }

  return (
    <div className={classes.noData}>
      <span>Try searching for people, topics, or keywords</span>
    </div>
  );
};

export { InstantSearchResults };
