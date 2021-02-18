import { Divider } from "@material-ui/core";
import React from "react";
import { QuackButton } from "..";
import { useMeQuery } from "../../generated/graphql";
import { useStyles } from "./styles";

export const Hero: React.FC = ({ children }) => {
  const classes = useStyles();
  const [{ data }] = useMeQuery();

  return (
    <div className={classes.root}>
      <Divider orientation="vertical" />
      <div className={classes.subRoot}>{children}</div>
      <Divider orientation="vertical" />
      {data?.me && (
        <QuackButton
          variant="fab"
          fabProps={{
            className: classes.fab,
            size: "large",
          }}
        />
      )}
    </div>
  );
};
