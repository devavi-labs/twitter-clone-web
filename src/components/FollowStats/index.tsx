import React from "react";
import {
  FollowersByUserIdQueryVariables,
  FollowingsByUserIdQueryVariables,
  useFollowersByUserIdQuery,
  useFollowingsByUserIdQuery,
} from "../../generated/graphql";
import { PaginatedUsers } from "../PaginatedUsers";

type FollowStatsProps = {
  type: "followers" | "following";
  userId: number | null | undefined;
};

const FollowStats: React.FC<FollowStatsProps> = ({ type, userId }) => {
  const [variables, setVariables] = React.useState<
    FollowersByUserIdQueryVariables | FollowingsByUserIdQueryVariables
  >({
    userId: userId ?? 0,
    limit: 20,
    lastIndex: null,
  });

  React.useEffect(() => {
    if (userId) {
      setVariables((v) => ({
        ...v,
        userId,
      }));
    }
  }, [userId]);

  const [
    { data: followersData, fetching: followersFetching, error: followersError },
  ] = useFollowersByUserIdQuery({
    variables,
    pause: !userId && type === "following",
  });
  const [
    { data: followingData, fetching: followingFetching, error: followingError },
  ] = useFollowingsByUserIdQuery({
    variables,
    pause: !userId && type === "followers",
  });

  const loadMore = () => {
    if (type === "followers") {
      if (
        followersData?.followersByUserId?.users &&
        followersData.followersByUserId.users.length > 0
      ) {
        const { users } = followersData.followersByUserId;
        setVariables((v) => ({
          ...v,
          lastIndex: users[users.length - 1].id,
        }));
      }
    } else {
      if (
        followingData?.followingsByUserId?.users &&
        followingData.followingsByUserId.users.length > 0
      ) {
        const { users } = followingData.followingsByUserId;
        setVariables((v) => ({
          ...v,
          lastIndex: users[users.length - 1].id,
        }));
      }
    }
  };

  if (type === "followers") {
    return (
      <PaginatedUsers
        users={followersData?.followersByUserId?.users}
        hasMore={followersData?.followersByUserId?.hasMore}
        loading={followersFetching}
        error={
          followersError
            ? followersError.networkError
              ? "network"
              : "other"
            : undefined
        }
        next={loadMore}
      />
    );
  } else {
    return (
      <PaginatedUsers
        users={followingData?.followingsByUserId?.users}
        hasMore={followingData?.followingsByUserId?.hasMore}
        loading={followingFetching}
        error={
          followingError
            ? followingError.networkError
              ? "network"
              : "other"
            : undefined
        }
        next={loadMore}
      />
    );
  }
};

export { FollowStats };
