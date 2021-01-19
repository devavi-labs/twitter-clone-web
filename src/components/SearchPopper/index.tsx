import React from "react";
import { InstantSearchResults } from "..";
import { Popper, PopperProps } from "../Popper";
import { useStyles } from "./styles";

const SearchPopper: React.FC<PopperProps> = (props) => {
  const classes = useStyles();

  return (
    <Popper {...props}>
      <div className={classes.paper}>
        <InstantSearchResults />
      </div>
    </Popper>
  );
};

export { SearchPopper };
