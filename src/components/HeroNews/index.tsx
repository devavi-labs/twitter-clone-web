import { formatDistanceToNow } from "date-fns";
import React from "react";
import { RegularNewsFragment } from "../../generated/graphql";
import { useStyles } from "./styles";

type HeroNewsProps = {
  news: RegularNewsFragment;
};

const HeroNews: React.FC<HeroNewsProps> = ({ news }) => {
  const classes = useStyles({ cover: news.cover });
  return (
    <div className={classes.heroNewsBox} onClick={() => window.open(news.url)}>
      <div className={classes.innerBox}>
        <div className={classes.heading}>
          <span className={classes.secondaryText}>
            {news.section.toUpperCase()}
          </span>
          {" · "}
          <span className={classes.secondaryText}>
            {formatDistanceToNow(new Date(news.publishedAt))}
          </span>
        </div>
        <h2 className={classes.title}>{news.title}</h2>
        <span className={classes.secondaryText}>{news.author}</span>
      </div>
    </div>
  );
};

export { HeroNews };
