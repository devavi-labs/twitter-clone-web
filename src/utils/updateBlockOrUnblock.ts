import { Cache } from "@urql/exchange-graphcache";
import {
  BlockMutation,
  BlockMutationVariables,
  RegularUserFragment,
  RegularUserFragmentDoc,
  UnblockMutation,
  UnblockMutationVariables,
} from "../generated/graphql";

export function updateBlockOrUnblock<
  T extends BlockMutation | UnblockMutation,
  V extends BlockMutationVariables | UnblockMutationVariables
>({
  type,
  cache,
  args,
  data,
}: {
  type: "block" | "unblock";
  cache: Cache;
  args: V;
  data: T;
}) {
  const { userId } = args as V;
  const _key = cache.keyOfEntity({ __typename: "User", id: userId });
  const _user =
    _key &&
    cache.readFragment<RegularUserFragment>(RegularUserFragmentDoc, _key);

  if (_user) {
    if (
      (type === "block" && (data as BlockMutation).block) ||
      (type === "unblock" && (data as UnblockMutation).unblock)
    ) {
      cache.writeFragment(RegularUserFragmentDoc, {
        ..._user,
        haveIBlockedThisUser: type === "block",
      });
    }
  }
}
