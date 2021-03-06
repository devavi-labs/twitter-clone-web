import React from "react";
import {
  QuacksFromUserQueryVariables,
  useQuacksFromUserQuery,
} from "../../generated/graphql";
import { PaginatedQuacks } from "..";

type ProfileQuacksProps = {
  userId: number;
  loading?: boolean;
};

const ProfileQuacks: React.FC<ProfileQuacksProps> = ({ userId, loading }) => {
  const [
    variables,
    setVariables,
  ] = React.useState<QuacksFromUserQueryVariables>({
    userId,
    limit: 20,
    lastIndex: null,
  });

  React.useEffect(() => {
    setVariables((v) => ({ ...v, userId }));
  }, [userId]);

  const [{ data, fetching, error }] = useQuacksFromUserQuery({
    variables,
    pause: loading || !variables.userId,
  });

  const loadMore = () => {
    if (data?.quacksFromUser?.quacks && data.quacksFromUser.quacks.length > 0) {
      const { quacks } = data.quacksFromUser;
      setVariables((v) => ({
        ...v,
        lastIndex: quacks[quacks.length - 1].id,
      }));
    }
  };

  return (
    <PaginatedQuacks
      quacks={data?.quacksFromUser?.quacks}
      hasMore={data?.quacksFromUser?.hasMore}
      next={loadMore}
      loading={fetching || loading}
      error={error ? (error.networkError ? "network" : "other") : null}
    />
  );
};

export { ProfileQuacks };
