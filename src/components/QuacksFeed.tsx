import { Divider, List } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { Quack, UserPopper } from ".";
import { useQuacksForMeQuery } from "../generated/graphql";
import { transform } from "../utils/quackTransformer";

export const QuacksFeed = () => {
  const useStyles = makeStyles(() => ({
    root: {},
  }));

  const classes = useStyles();

  const [{ data }] = useQuacksForMeQuery();

  if (data?.quacksForMe?.quacks && data?.quacksForMe.quacks.length > 0)
    return (
      <>
        <List className={classes.root}>
          <Divider />
          {data.quacksForMe.quacks.map((quack) => {
            const { main, inReplyTo, reply } = transform(quack);
            return (
              <React.Fragment key={main.id}>
                <Quack
                  quack={main}
                  inReplyTo={inReplyTo}
                  showBar={reply ? "bottom" : undefined}
                />
                {reply && <Quack quack={reply} showBar="top" variant="reply" />}
                <Divider />
              </React.Fragment>
            );
          })}
        </List>
        <UserPopper />
      </>
    );

  return <></>;
};
