import { Divider } from "@material-ui/core";
import React from "react";
import { QuackButton } from "..";
import { useStyles } from "./styles";

export const Hero: React.FC = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Divider orientation="vertical" />
      <div className={classes.subRoot}>{children}</div>
      <Divider orientation="vertical" />
      <QuackButton
        variant="fab"
        fabProps={{
          className: classes.fab,
          size: "large",
        }}
      />
    </div>
  );
};
