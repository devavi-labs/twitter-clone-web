import React from "react";
import { Link } from "@material-ui/core";

type MentionProps = { username: string };

const Mention: React.FC<MentionProps> = ({ username }) => {
  return <Link href={`/${username}`}>@{username}</Link>;
};

export { Mention };
