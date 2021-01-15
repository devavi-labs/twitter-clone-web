import React from "react";
import {
  QuacksForMeQueryVariables,
  useQuacksForMeQuery,
} from "../generated/graphql";
import { CreateQuack, PaginatedQuacks } from ".";
import { useMediaQuery } from "../hooks/useMediaQuery";

export const QuacksFeed: React.FC = () => {
  const [variables, setVariables] = React.useState<QuacksForMeQueryVariables>({
    limit: 20,
    lastIndex: null,
  });

  const [{ data, fetching, error }] = useQuacksForMeQuery({
    variables,
  });

  const loadMore = () => {
    if (data?.quacksForMe?.quacks && data.quacksForMe.quacks.length > 0) {
      const { quacks } = data.quacksForMe;
      setVariables((v) => ({
        ...v,
        lastIndex: quacks[quacks.length - 1].id,
      }));
    }
  };

  const { xs } = useMediaQuery();

  return (
    <div>
      {!xs && <CreateQuack />}
      <PaginatedQuacks
        quacks={data?.quacksForMe?.quacks}
        hasMore={data?.quacksForMe?.hasMore}
        next={loadMore}
        loading={fetching}
        error={error ? (error.networkError ? "network" : "other") : null}
      />
    </div>
  );
};
