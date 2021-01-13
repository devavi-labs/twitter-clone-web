import { Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Quack, UserPopper, CircularProgressBar } from ".";
import {
  QuacksForMeQueryVariables,
  useQuacksForMeQuery,
} from "../generated/graphql";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { transform } from "../utils/quackTransformer";

export const QuacksFeed = () => {
  const useStyles = makeStyles(() => ({
    root: {},
    loading: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "1rem 0",
    },
  }));

  const classes = useStyles();

  const { xs } = useMediaQuery();

  const [variables, setVariables] = React.useState<QuacksForMeQueryVariables>({
    limit: 20,
    lastIndex: null,
  });

  const [{ data, fetching }] = useQuacksForMeQuery({ variables });

  if (fetching) {
    return (
      <div className={classes.loading}>
        <CircularProgressBar />
      </div>
    );
  } else if (data?.quacksForMe?.quacks && data?.quacksForMe.quacks.length > 0)
    return (
      <div>
        <InfiniteScroll
          className={classes.root}
          dataLength={data?.quacksForMe?.quacks?.length}
          next={() =>
            setVariables((v) => ({
              ...v,
              lastIndex:
                data?.quacksForMe?.quacks &&
                data?.quacksForMe?.quacks[data?.quacksForMe?.quacks?.length - 1]
                  .id,
            }))
          }
          hasMore={data?.quacksForMe?.hasMore}
          loader={
            <div className={classes.loading}>
              <CircularProgressBar />
            </div>
          }
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>You've seen it all!</b>
            </p>
          }
        >
          <Divider />
          {data.quacksForMe.quacks.map((quack, index) => {
            if (quack) {
              const { main, inReplyTo, reply } = transform(quack);
              return (
                <React.Fragment key={index}>
                  <Quack
                    quack={main}
                    inReplyTo={inReplyTo}
                    showBar={reply ? "bottom" : undefined}
                  />
                  {reply && (
                    <Quack quack={reply} showBar="top" variant="reply" />
                  )}
                  <Divider />
                </React.Fragment>
              );
            }
            return <></>;
          })}
        </InfiniteScroll>
        {!xs && <UserPopper />}
      </div>
    );

  return <></>;
};
