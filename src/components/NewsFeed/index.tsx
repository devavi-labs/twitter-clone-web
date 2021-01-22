import React from "react";
import { useNewsQuery } from "../../generated/graphql";
import { List } from "@material-ui/core";
import {
  NewsListItem,
  ErrorDisplay,
  CircularProgressBar,
  EmptyDataDisplay,
} from "..";
import { useStyles } from "./styles";

type NewsFeedProps = {
  type: "world" | "health" | "science" | "business" | "sports" | "movies";
};

const NewsFeed: React.FC<NewsFeedProps> = ({ type }) => {
  const [{ data, fetching, error }] = useNewsQuery({
    variables: {
      section: type,
    },
  });

  const classes = useStyles();

  if (error) {
    return (
      <ErrorDisplay
        error={error ? (error.networkError ? "network" : "other") : undefined}
      />
    );
  }

  if (fetching) {
    return (
      <div className={classes.loading}>
        <CircularProgressBar />
      </div>
    );
  } else if (data?.news && data?.news?.length <= 0) {
    return <EmptyDataDisplay />;
  } else
    return (
      <List>
        {data?.news?.map(
          ({ id, title, abstract, thumbnailUrl, caption, url }) => (
            <NewsListItem
              key={id}
              title={title}
              abstract={abstract}
              thumbnail={thumbnailUrl}
              caption={caption}
              url={url}
            />
          )
        )}
      </List>
    );
};

export { NewsFeed };
