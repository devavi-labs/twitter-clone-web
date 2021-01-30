import React from "react";
import { SearchQueryVariables, useSearchQuery } from "../../generated/graphql";
import { PaginatedQuacks } from "../PaginatedQuacks";
import { PaginatedUsers } from "../PaginatedUsers";
import { useStyles } from "./styles";

type SearchResultsProps = {
  query: string | null;
  type?: "quack" | "user";
};

export const SearchResults: React.FC<SearchResultsProps> = ({
  query,
  type = "quack",
}) => {
  const classes = useStyles();

  const [variables, setVariables] = React.useState<SearchQueryVariables>({
    query: query ?? "",
    type,
    fromFollowing: false,
    limit: 20,
    lastIndex: null,
  });

  React.useEffect(() => {
    if (query) {
      setVariables((v) => ({ ...v, query }));
    }
  }, [query]);

  const [{ data, fetching, error }] = useSearchQuery({
    variables,
    pause: !query,
  });

  const loadMore = () => {
    if (type === "quack") {
      if (
        data?.search.paginatedQuacks?.quacks &&
        data.search.paginatedQuacks.quacks.length > 0
      ) {
        const { quacks } = data.search.paginatedQuacks;
        setVariables((v) => ({
          ...v,
          lastIndex: quacks[quacks.length - 1].id,
        }));
      }
    } else if (type === "user") {
      if (
        data?.search.paginatedUsers?.users &&
        data.search.paginatedUsers.users.length > 0
      ) {
        const { users } = data.search.paginatedUsers;
        setVariables((v) => ({
          ...v,
          lastIndex: users[users.length - 1].id,
        }));
      }
    }
  };

  return (
    <div className={classes.searchResults}>
      {type === "quack" ? (
        <PaginatedQuacks
          quacks={query ? data?.search.paginatedQuacks?.quacks : undefined}
          hasMore={data?.search.paginatedQuacks?.hasMore}
          loading={fetching}
          error={error ? (error.networkError ? "network" : "other") : undefined}
          next={loadMore}
        />
      ) : (
        <PaginatedUsers
          users={query ? data?.search.paginatedUsers?.users : undefined}
          hasMore={data?.search.paginatedUsers?.hasMore}
          loading={fetching}
          error={error ? (error.networkError ? "network" : "other") : undefined}
          next={loadMore}
        />
      )}
    </div>
  );
};
