import { Box, Divider } from "@material-ui/core";
import React from "react";
import { useParams } from "react-router-dom";
import {
  AppBar,
  CircularProgressBar,
  EmptyDataDisplay,
  ErrorDisplay,
  PaginatedScroll,
  Quack,
} from "../../components";
import {
  RepliesOfQuackQueryVariables,
  useQuackByIdQuery,
  useRepliesOfQuackQuery,
} from "../../generated/graphql";
import { transform } from "../../utils/quackTransformer";
import { useStyles } from "./styles";

export const QuackPage: React.FC = () => {
  const classes = useStyles();

  const { quackId } = useParams<{ quackId: string }>();

  const [
    { data: quackData, fetching: quackFetching, error: quackError },
  ] = useQuackByIdQuery({
    variables: { id: parseInt(quackId) },
  });

  const [
    variables,
    setVariables,
  ] = React.useState<RepliesOfQuackQueryVariables>({
    quackId: parseInt(quackId),
    limit: 20,
    lastIndex: null,
  });

  React.useEffect(() => {
    setVariables((v) => ({ ...v, quackId: parseInt(quackId) }));
  }, [quackId]);

  const [
    { data: repliesData, fetching: repliesLoading, error: repliesError },
  ] = useRepliesOfQuackQuery({
    variables: variables,
  });

  const loadMoreReplies = () => {
    if (
      repliesData?.repliesOfQuack?.quacks &&
      repliesData.repliesOfQuack.quacks.length > 0
    ) {
      const { quacks } = repliesData.repliesOfQuack;
      setVariables((v) => ({
        ...v,
        lastIndex: quacks[quacks.length - 1].id,
      }));
    }
  };

  const transformedQuack = quackData?.quackById
    ? transform(quackData.quackById)
    : undefined;

  return (
    <main className={classes.quackPage}>
      {quackFetching ? (
        <div className={classes.loading}>
          <CircularProgressBar />
        </div>
      ) : quackError ? (
        <ErrorDisplay
          error={
            quackError
              ? quackError.networkError
                ? "network"
                : "other"
              : undefined
          }
        />
      ) : quackData?.quackById ? (
        <React.Fragment>
          <AppBar
            title="Quack"
            bottomDivider={false}
            backButton
            position="sticky"
          />
          {transformedQuack && (
            <React.Fragment>
              {transformedQuack.reply && (
                <div className={classes.replyTo}>
                  <Quack
                    quack={transformedQuack.main}
                    variant="reply"
                    inReplyTo={transformedQuack.inReplyTo}
                    showBar={!!transformedQuack.reply}
                  />
                </div>
              )}
              <Quack
                quack={transformedQuack.reply || transformedQuack.main}
                variant="open"
              />
            </React.Fragment>
          )}
          <Divider />
          <PaginatedScroll
            length={repliesData?.repliesOfQuack?.quacks?.length ?? 0}
            hasMore={repliesData?.repliesOfQuack?.hasMore ?? false}
            loading={repliesLoading}
            next={loadMoreReplies}
            error={
              repliesError
                ? repliesError.networkError
                  ? "network"
                  : "other"
                : undefined
            }
            onEmptyTitle="No replies yet"
            onEmptyMessage="Why not be the first one to reply?"
          >
            <Box m={1} />
            <Divider />
            {repliesData?.repliesOfQuack?.quacks?.map((quack, index) => {
              if (quack) {
                return (
                  <React.Fragment key={index}>
                    <Quack quack={quack} variant="reply" />
                    <Divider />
                  </React.Fragment>
                );
              }
              return <></>;
            })}
          </PaginatedScroll>
        </React.Fragment>
      ) : (
        <EmptyDataDisplay
          title="Couldn't find the quack"
          message="Try searching for some other quacks"
        />
      )}
    </main>
  );
};
