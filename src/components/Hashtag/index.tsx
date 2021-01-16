import React from "react";
import { Link } from "@material-ui/core";
import { Link as RouteLink } from "react-router-dom";

type HashtagProps = { hashtag: string };

const Hashtag: React.FC<HashtagProps> = ({ hashtag }) => {
  return (
    <Link component={RouteLink} to={`/hashtag/${hashtag}`}>
      #{hashtag}
    </Link>
  );
};

export { Hashtag };
