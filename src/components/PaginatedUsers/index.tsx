import { Box, Divider } from "@material-ui/core";
import React from "react";
import { PaginatedScroll } from "..";
import { RegularUserFragment } from "../../generated/graphql";
import { UserListItem } from "../UserListItem";

type PaginatedUsersProps = {
  users?: RegularUserFragment[] | null | undefined;
  hasMore?: boolean;
  next?: () => void;
  loading?: boolean;
  error?: "network" | "other" | null;
  onEmptyTitle?: string;
  onEmptyMessage?: string;
  onUserClick?: (user: RegularUserFragment | null | undefined) => void;
};

export const PaginatedUsers: React.FC<PaginatedUsersProps> = ({
  users,
  hasMore = false,
  next = () => {},
  loading = false,
  error,
  onEmptyTitle,
  onEmptyMessage,
  onUserClick,
}) => (
  <PaginatedScroll
    length={users?.length || 0}
    next={next}
    hasMore={hasMore}
    loading={loading}
    error={error}
    onEmptyTitle={onEmptyTitle}
    onEmptyMessage={onEmptyMessage}
  >
    <Box m={1} />
    <Divider />
    {users?.map((user) => (
      <UserListItem key={user.id} user={user} onClick={onUserClick} />
    ))}
  </PaginatedScroll>
);
