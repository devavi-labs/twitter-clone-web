import { Button, ListItem } from "@material-ui/core";
import React from "react";
import { RegularNewsFragment } from "../../generated/graphql";
import { useStyles } from "./styles";

type NewsListItemProps = {
  news: RegularNewsFragment;
};

const NewsListItem: React.FC<NewsListItemProps> = ({
  news: { title, abstract, thumbnailUrl, caption, url },
}) => {
  const classes = useStyles();

  return (
    <ListItem
      className={classes.feedItem}
      component={Button}
      disableRipple
      onClick={() => window.open(url)}
    >
      <div>
        <h3 className={classes.title}>{title}</h3>
        <p className={classes.abstract}>{abstract}</p>
      </div>
      {thumbnailUrl && (
        <img
          src={thumbnailUrl}
          alt={caption ?? title}
          className={classes.thumbnail}
        />
      )}
    </ListItem>
  );
};

export { NewsListItem };
