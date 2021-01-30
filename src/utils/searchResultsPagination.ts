import { Resolver } from "@urql/exchange-graphcache";
import { stringifyVariables } from "urql";

export const searchResultsPagination = (): Resolver => (
  _parent,
  fieldArgs,
  cache,
  info
) => {
  const { parentKey: entityKey, fieldName } = info;

  const allFields = cache.inspectFields(entityKey);
  const fieldInfos = allFields.filter((info) => info.fieldName === fieldName);
  const size = fieldInfos.length;

  if (size === 0) {
    return undefined;
  }

  const fieldKey = `${fieldName}(${stringifyVariables(fieldArgs)})`;
  const isItInTheCache = cache.resolve(
    cache.resolve(entityKey, fieldKey) as string,
    fieldName
  );

  info.partial = !isItInTheCache;

  let hasMoreQuacks = true;
  const quacks: string[] = [];
  let hasMoreUsers = true;
  const users: string[] = [];

  fieldInfos.forEach((fi) => {
    const key = cache.resolve(entityKey, fi.fieldKey) as string;

    const keyForQuacks = cache.resolve(key, "paginatedQuacks") as string;
    const _quacks = cache.resolve(keyForQuacks, "quacks") as string[];
    const _hasMoreQuacks = cache.resolve(keyForQuacks, "hasMore");

    if (!_hasMoreQuacks) {
      hasMoreQuacks = _hasMoreQuacks as boolean;
    }

    if (_quacks) quacks.push(..._quacks);

    const keyForUsers = cache.resolve(key, "paginatedUsers") as string;
    const _users = cache.resolve(keyForUsers, "users") as string[];
    const _hasMoreUsers = cache.resolve(keyForUsers, "hasMore");

    if (!_hasMoreUsers) {
      hasMoreUsers = _hasMoreUsers as boolean;
    }

    if (_users) users.push(..._users);
  });

  return {
    __typename: "SearchResponse",
    paginatedQuacks: {
      __typename: "PaginatedQuacks",
      quacks,
      hasMore: hasMoreQuacks,
    },
    paginatedUsers: {
      __typename: "PaginatedUsers",
      users,
      hasMore: hasMoreUsers,
    },
  };
};
