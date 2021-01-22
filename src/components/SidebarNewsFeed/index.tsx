import { Button, Divider, List, ListItem } from "@material-ui/core";
import React from "react";
import { useNewsQuery } from "../../generated/graphql";
import { useStyles } from "./styles";
import { CircularProgressBar, ErrorDisplay, NewsListItem } from "..";

const SidebarNewsFeed: React.FC = () => {
  const classes = useStyles();

  const [{ data, fetching, error }] = useNewsQuery({
    variables: {
      section: "world",
    },
  });

  const maxItemsLength = 10;

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
          {data?.news?.map(
            ({ id, title, abstract, thumbnailUrl, caption, url }, i) => {
              if (i < maxItemsLength) {
                return (
                  <React.Fragment>
                    <NewsListItem
                      key={id}
                      title={title}
                      abstract={abstract}
                      thumbnail={thumbnailUrl}
                      caption={caption}
                      url={url}
                    />
                    <Divider />
                  </React.Fragment>
                );
              }
              return <React.Fragment />;
            }
          )}
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
