import { Cache, Data } from "@urql/exchange-graphcache";
import {
  LikeMutationVariables,
  RegularQuackFragment,
  RegularQuackFragmentDoc,
  RequackMutationVariables,
} from "../generated/graphql";

export function updateLikeOrRequack({
  type,
  args,
  cache,
}: {
  type: "like" | "requack";
  args: LikeMutationVariables | RequackMutationVariables;
  cache: Cache;
}) {
  const { quackId } = args;

  const entity = { __typename: "Quack", id: quackId } as const;
  const _key = cache.keyOfEntity(entity);

  const _quack =
    _key &&
    cache.readFragment<RegularQuackFragment>(RegularQuackFragmentDoc, _key);

  if (_quack) {
    let _updatedQuack: Partial<RegularQuackFragment> = entity;

    const _status = _quack[`${type}Status` as "likeStatus" | "requackStatus"];
    const _count = _quack[`${type}s` as "likes" | "requacks"];

    _updatedQuack[`${type}Status` as "likeStatus" | "requackStatus"] = !_status;

    _updatedQuack[`${type}s` as "likes" | "requacks"] = _status
      ? _count
        ? _count - 1
        : 0
      : _count
      ? _count + 1
      : 1;

    return _updatedQuack as Data;
  }

  return null;
}
