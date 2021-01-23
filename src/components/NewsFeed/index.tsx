import { Divider, List } from "@material-ui/core";
import React from "react";
import {
  CircularProgressBar,
  EmptyDataDisplay,
  ErrorDisplay,
  HeroNews,
  NewsListItem,
} from "..";
import { useNewsQuery } from "../../generated/graphql";
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

  const heroNews = React.useMemo(() => data?.news?.find((news) => news.cover), [
    data?.news,
  ]);
  const newsList = React.useMemo(
    () => data?.news?.filter((news) => news !== heroNews),
    [data?.news, heroNews]
  );

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
      <List className={classes.list}>
        {heroNews && (
          <React.Fragment>
            <HeroNews news={heroNews} />
            <Divider />
          </React.Fragment>
        )}
        {newsList?.map((news) => (
          <NewsListItem key={news.id} news={news} />
        ))}
      </List>
    );
};

export { NewsFeed };
