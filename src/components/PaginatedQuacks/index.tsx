import { Box, Divider } from "@material-ui/core";
import React from "react";
import { PaginatedScroll, Quack, UserPopper } from "..";
import { RegularQuackFragment } from "../../generated/graphql";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { transform } from "../../utils/quackTransformer";

type PaginatedQuacksProps = {
  quacks?: RegularQuackFragment[] | null | undefined;
  hasMore?: boolean;
  next?: () => void;
  loading?: boolean;
  error?: "network" | "other" | null;
  onEmptyTitle?: string;
  onEmptyMessage?: string;
};

export const PaginatedQuacks: React.FC<PaginatedQuacksProps> = ({
  quacks,
  hasMore = false,
  next = () => {},
  loading = false,
  error,
  onEmptyTitle,
  onEmptyMessage,
}) => {
  const { xs } = useMediaQuery();

  return (
    <div>
      <PaginatedScroll
        length={quacks?.length || 0}
        next={next}
        hasMore={hasMore}
        loading={loading}
        error={error}
        onEmptyTitle={onEmptyTitle}
        onEmptyMessage={onEmptyMessage}
      >
        <Box m={1} />
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
                {reply && <Quack quack={reply} showBar="top" variant="reply" />}
                <Divider />
              </React.Fragment>
            );
          }
          return <></>;
        })}
        {!xs && <UserPopper />}
      </PaginatedScroll>
    </div>
  );
};
