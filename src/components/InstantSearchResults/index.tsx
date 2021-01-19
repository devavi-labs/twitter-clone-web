import { Button, Divider, List, ListItem } from "@material-ui/core";
import React from "react";
import { CircularProgressBar, UserListItem, RecentSearches } from "..";
import { useStyles } from "./styles";
import { useHistory } from "react-router-dom";
import { ISearchResultContext } from "../../context/instantSearch";
import { useRecentSearches } from "../../hooks/useRecentSearches";
import { useSearchQuery } from "../../generated/graphql";

const InstantSearchResults: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();

  const { query } = React.useContext(ISearchResultContext)!;

  const [{ data, fetching }] = useSearchQuery({
    variables: {
      query: query!,
      type: "user",
      limit: 3,
    },
    pause: !query,
  });

  const {
    searches,
    pushSearch,
    removeSearch,
    removeAllRecentSearches,
  } = useRecentSearches();

  const handleSearch = () => {
    query && pushSearch(query);
    query && history.push(`/search?q=${query}&src=typed_query`);
  };

  if (fetching) {
    return (
      <div className={classes.loading}>
        <CircularProgressBar />
      </div>
    );
  }

  if (query && query.length > 0) {
    return (
      <React.Fragment>
        {searches && searches.length > 0 && (
          <RecentSearches
            searches={searches}
            removeSearch={removeSearch}
            removeAllRecentSearches={removeAllRecentSearches}
          />
        )}
        <List>
          <ListItem
            component={Button}
            className={classes.listItem}
            onClick={handleSearch}
          >
            Search for {query}
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
                onClick={() => history.push(`/${query}`)}
              >
                Go to @{query}
              </ListItem>
            </>
          )}
        </List>
      </React.Fragment>
    );
  }

  if (searches && searches.length > 0) {
    return (
      <RecentSearches
        searches={searches}
        removeSearch={removeSearch}
        removeAllRecentSearches={removeAllRecentSearches}
      />
    );
  }

  return (
    <div className={classes.noData}>
      <span>Try searching for people, topics, or keywords</span>
    </div>
  );
};

export { InstantSearchResults };
