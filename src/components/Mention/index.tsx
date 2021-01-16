import React from "react";
import { Link } from "@material-ui/core";
import { Link as RouteLink } from "react-router-dom";

type MentionProps = { username: string };

const Mention: React.FC<MentionProps> = ({ username }) => {
  return (
    <Link component={RouteLink} to={`/${username}`}>
      @{username}
    </Link>
  );
};

export { Mention };
