import { Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { CircularProgressBar, Quack, UserPopper } from ".";
import {
  QuacksForMeQueryVariables,
  RegularQuackFragment,
  useQuacksForMeQuery,
  useQuacksFromUserQuery,
} from "../generated/graphql";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { transform } from "../utils/quackTransformer";

type QuacksFeedProps = {
  viewQuacks?: boolean;
  fromUser?: boolean;
  userId?: number;
};

export const QuacksFeed: React.FC<QuacksFeedProps> = ({
  viewQuacks,
  fromUser,
  userId,
}) => {
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

  const [
    { data: quacksFromUser, fetching: fetchingFromUser },
  ] = useQuacksFromUserQuery({
    variables: {
      userId: userId!,
      ...variables,
    },
    pause: !fromUser || !userId,
  });

  const [{ data: quacksForMe, fetching: fetchingForMe }] = useQuacksForMeQuery({
    variables,
    pause: !viewQuacks || fromUser,
  });

  const [quacks, setQuacks] = React.useState<RegularQuackFragment[]>([]);
  const [hasMore, setHasMore] = React.useState(false);

  React.useEffect(() => {
    if (
      fromUser &&
      quacksFromUser?.quacksFromUser &&
      quacksFromUser.quacksFromUser?.quacks !== quacks
    ) {
      setQuacks(quacksFromUser.quacksFromUser.quacks as RegularQuackFragment[]);
      setHasMore(quacksFromUser.quacksFromUser.hasMore);
    }

    if (
      !fromUser &&
      quacksForMe?.quacksForMe &&
      quacksForMe.quacksForMe.quacks !== quacks
    ) {
      setQuacks(quacksForMe.quacksForMe.quacks as RegularQuackFragment[]);
      setHasMore(quacksForMe.quacksForMe.hasMore);
    }
  }, [
    fromUser,
    quacks,
    quacksForMe?.quacksForMe,
    quacksFromUser?.quacksFromUser,
  ]);

  if (fetchingForMe || fetchingFromUser) {
    return (
      <div className={classes.loading}>
        <CircularProgressBar />
      </div>
    );
  } else if (quacks && quacks.length > 0)
    return (
      <div>
        <InfiniteScroll
          className={classes.root}
          dataLength={quacks?.length}
          next={() =>
            setVariables((v) => ({
              ...v,
              lastIndex: quacks && quacks[quacks?.length - 1].id,
            }))
          }
          hasMore={hasMore}
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
          {quacks?.map((quack, index) => {
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
