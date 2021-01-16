import React from "react";
import { Link as MuiLink } from "@material-ui/core";

type LinkProps = { link: string };

const Link: React.FC<LinkProps> = ({ link }) => {
  let _link: string;

  if (link.startsWith("http")) {
    _link = link;
  } else {
    _link = "https://" + link;
  }

  return <MuiLink href={_link}>{link}</MuiLink>;
};

export { Link };
