import { Button, ListItem } from "@material-ui/core";
import React from "react";
import { useStyles } from "./styles";

type NewsListItemProps = {
  title: string;
  abstract: string;
  thumbnail: string;
  caption: string;
  url: string;
};

const NewsListItem: React.FC<NewsListItemProps> = ({
  title,
  abstract,
  thumbnail,
  caption,
  url,
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
      <img
        src={thumbnail}
        alt={caption || title}
        className={classes.thumbnail}
      />
    </ListItem>
  );
};

export { NewsListItem };
