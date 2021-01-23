import { Button, Divider, List, ListItem } from "@material-ui/core";
import React from "react";
import { useNewsQuery } from "../../generated/graphql";
import { useStyles } from "./styles";
import { CircularProgressBar, ErrorDisplay, NewsListItem } from "..";

const SidebarNewsFeed: React.FC = () => {
  const classes = useStyles();
  const maxItemsLength = 10;

  const [{ data, fetching, error }] = useNewsQuery({
    variables: {
      section: "world",
      limit: maxItemsLength,
    },
  });

  return (
    <List className={classes.feedCard}>
      {fetching ? (
        <div className={classes.loading}>
          <CircularProgressBar />
        </div>
      ) : error ? (
        <ErrorDisplay
          error={error ? (error.networkError ? "network" : "other") : undefined}
        />
      ) : (
        <React.Fragment>
          <ListItem className={classes.feedHeader}>
            <h2 className={classes.heading}>What's happening</h2>
          </ListItem>
          {data?.news?.map((news) => (
            <React.Fragment>
              <NewsListItem key={news.id} news={news} />
              <Divider />
            </React.Fragment>
          ))}
          {data?.news && (
            <ListItem
              className={classes.footer}
              component={Button}
              disableRipple
            >
              Show More
            </ListItem>
          )}
        </React.Fragment>
      )}
    </List>
  );
};

export { SidebarNewsFeed };
