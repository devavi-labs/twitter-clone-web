import React from "react";
import {
  LikesByUserIdQueryVariables,
  useLikesByUserIdQuery,
} from "../../generated/graphql";
import { PaginatedQuacks } from "..";

type ProfileLikesProps = {
  userId: number;
};

const ProfileLikes: React.FC<ProfileLikesProps> = ({ userId }) => {
  const [variables, setVariables] = React.useState<LikesByUserIdQueryVariables>(
    {
      userId,
      limit: 20,
      lastIndex: null,
    }
  );

  const [{ data, fetching, error }] = useLikesByUserIdQuery({
    variables,
  });

  const loadMore = () => {
    if (data?.likesByUserId?.quacks && data.likesByUserId.quacks.length > 0) {
      const { quacks } = data.likesByUserId;
      setVariables((v) => ({
        ...v,
        lastIndex: quacks[quacks.length - 1].id,
      }));
    }
  };

  return (
    <PaginatedQuacks
      quacks={data?.likesByUserId?.quacks}
      hasMore={data?.likesByUserId?.hasMore}
      next={loadMore}
      loading={fetching}
      error={error ? (error.networkError ? "network" : "other") : null}
    />
  );
};

export { ProfileLikes };
