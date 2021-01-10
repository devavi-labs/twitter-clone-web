import React from "react";
import { Link } from "@material-ui/core";

type HashtagProps = { hashtag: string };

const Hashtag: React.FC<HashtagProps> = ({ hashtag }) => {
  return <Link href={`/hashtag/${hashtag}`}>#{hashtag}</Link>;
};

export { Hashtag };
