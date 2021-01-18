import React from "react";
import {
  QuacksForMeQueryVariables,
  useQuacksForMeQuery,
} from "../../generated/graphql";
import { CreateQuack, PaginatedQuacks, AppBar } from "../../components";
import { useStyles } from "./styles";

export const Feed: React.FC = () => {
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

  const classes = useStyles();

  return (
    <div>
      <AppBar title="Home" />
      <div className={classes.createQuack}>
        <CreateQuack />
      </div>
      <PaginatedQuacks
        quacks={data?.quacksForMe?.quacks}
        hasMore={data?.quacksForMe?.hasMore}
        next={loadMore}
        loading={fetching}
        error={error ? (error.networkError ? "network" : "other") : null}
        onEmptyTitle="What? No Quacks yet?"
        onEmptyMessage="This empty timeline won't be around for long. Start following people and you'll see their quacks show up here."
      />
    </div>
  );
};
