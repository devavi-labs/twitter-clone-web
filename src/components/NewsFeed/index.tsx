import React from "react";
import { useNewsQuery } from "../../generated/graphql";

type NewsFeedProps = {
  type: "world" | "health" | "science" | "politics" | "sports" | "movies";
};

const NewsFeed: React.FC<NewsFeedProps> = ({ type }) => {
  const [{ data, fetching }] = useNewsQuery({
    variables: {
      section: type,
    },
  });
  return (
    <div>
      <h1>{type}</h1>
      {fetching && <h2>loading...</h2>}
      <ul>
        {data?.news?.map((news) => (
          <li>{news.title}</li>
        ))}
      </ul>
    </div>
  );
};

export { NewsFeed };
