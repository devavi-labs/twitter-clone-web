import { Resolver } from "@urql/exchange-graphcache";
import { stringifyVariables } from "urql";

export const quacksPagination = (): Resolver => (
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

  let hasMore = true;
  const quacks: string[] = [];

  fieldInfos.forEach((fi) => {
    const key = cache.resolve(entityKey, fi.fieldKey) as string;
    const data = cache.resolve(key, "quacks") as string[];
    const _hasMore = cache.resolve(key, "hasMore");

    if (!_hasMore) {
      hasMore = _hasMore as boolean;
    }

    if (data) quacks.push(...data);
  });

  return {
    __typename: "PaginatedQuacks",
    hasMore,
    quacks,
  };
};
