import { Box, Divider } from "@material-ui/core";
import React from "react";
import { PaginatedScroll, Quack } from "..";
import { RegularQuackFragment } from "../../generated/graphql";
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
                <Quack quack={main} inReplyTo={inReplyTo} showBar={!!reply} />
                {reply && <Quack quack={reply} variant="reply" />}
                <Divider />
              </React.Fragment>
            );
          }
          return <></>;
        })}
      </PaginatedScroll>
    </div>
  );
};
