import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { CircularProgressBar, ErrorDisplay, EmptyDataDisplay } from "..";

type PaginatedScrollProps = {
  loading: boolean;
  hasMore: boolean;
  length: number;
  next: () => void;
  error?: "network" | "other" | null;
  onEmptyTitle?: string;
  onEmptyMessage?: string;
};

const PaginatedScroll: React.FC<PaginatedScrollProps> = ({
  loading,
  hasMore,
  length,
  next,
  error,
  onEmptyTitle,
  onEmptyMessage,
  children,
}) => {
  const useStyles = makeStyles(() => ({
    loading: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "1rem 0",
    },
  }));

  const classes = useStyles();

  if (error) {
    return <ErrorDisplay error={error} />;
  }

  if (loading) {
    return (
      <div className={classes.loading}>
        <CircularProgressBar />
      </div>
    );
  } else if (length <= 0) {
    return <EmptyDataDisplay title={onEmptyTitle} message={onEmptyMessage} />;
  } else if (length > 0)
    return (
      <div>
        <InfiniteScroll
          dataLength={length}
          next={next}
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
          {children}
        </InfiniteScroll>
      </div>
    );
  return <></>;
};

export { PaginatedScroll };
