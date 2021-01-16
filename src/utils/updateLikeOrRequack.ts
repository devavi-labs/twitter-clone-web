import { Cache } from "@urql/exchange-graphcache";
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

  const _key = cache.keyOfEntity({
    __typename: "Quack",
    id: quackId,
  });

  const _quack =
    _key &&
    cache.readFragment<RegularQuackFragment>(RegularQuackFragmentDoc, _key);

  if (_quack) {
    const actualStatus =
      type === "like" ? _quack.likeStatus : _quack.requackStatus;
    const actualCount = type === "like" ? _quack.likes : _quack.requacks;

    const status = !actualStatus;

    const count = actualStatus
      ? actualCount
        ? actualCount - 1
        : 0
      : actualCount
      ? actualCount + 1
      : 1;
    cache.writeFragment(RegularQuackFragmentDoc, {
      ..._quack,
      [`${type}Status`]: status,
      [`${type}s`]: count,
    });
  }
}
