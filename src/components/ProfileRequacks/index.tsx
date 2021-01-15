import React from "react";
import {
  RequacksByUserIdQueryVariables,
  useRequacksByUserIdQuery,
} from "../../generated/graphql";
import { PaginatedQuacks } from "..";

type ProfileRequacksProps = {
  userId: number;
};

const ProfileRequacks: React.FC<ProfileRequacksProps> = ({ userId }) => {
  const [
    variables,
    setVariables,
  ] = React.useState<RequacksByUserIdQueryVariables>({
    userId,
    limit: 20,
    lastIndex: null,
  });

  const [{ data, fetching, error }] = useRequacksByUserIdQuery({
    variables,
  });

  const loadMore = () => {
    if (
      data?.requacksByUserId?.quacks &&
      data.requacksByUserId.quacks.length > 0
    ) {
      const { quacks } = data.requacksByUserId;
      setVariables((v) => ({
        ...v,
        lastIndex: quacks[quacks.length - 1].id,
      }));
    }
  };

  return (
    <PaginatedQuacks
      quacks={data?.requacksByUserId?.quacks}
      hasMore={data?.requacksByUserId?.hasMore}
      next={loadMore}
      loading={fetching}
      error={error ? (error.networkError ? "network" : "other") : null}
    />
  );
};

export { ProfileRequacks };
