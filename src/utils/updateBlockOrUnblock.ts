import { Cache, Data } from "@urql/exchange-graphcache";
import {
  MeQuery,
  BlockMutationVariables,
  RegularUserFragment,
  RegularUserFragmentDoc,
  MeQueryVariables,
  UnblockMutationVariables,
  MeDocument,
} from "../generated/graphql";

export function updateBlockOrUnblock<
  V extends BlockMutationVariables | UnblockMutationVariables
>({ type, cache, args }: { type: "block" | "unblock"; cache: Cache; args: V }) {
  const { userId } = args as V;

  const entity = { __typename: "User", id: userId } as const;
  const _key = cache.keyOfEntity(entity);
  const _user =
    _key &&
    cache.readFragment<RegularUserFragment>(RegularUserFragmentDoc, _key);

  if (_user) {
    let _updatedUser: Partial<RegularUserFragment> = entity;

    if (type === "block") {
      if (_user.followStatus) {
        _updatedUser.followStatus = false;
        _updatedUser.followers = _updatedUser.followers
          ? _updatedUser.followers - 1
          : 0;

        const _meQuery = cache.readQuery<MeQuery, MeQueryVariables>({
          query: MeDocument,
        });

        if (_meQuery?.me) {
          let _updatedMe: Partial<RegularUserFragment> = {
            __typename: "User",
            id: _meQuery.me.id,
          };

          _updatedUser.followings = _updatedUser.followings
            ? _updatedUser.followings - 1
            : 0;

          cache.writeFragment(MeDocument, _updatedMe);
        }
      }
    }

    return _updatedUser as Data;
  }

  return null;
}
