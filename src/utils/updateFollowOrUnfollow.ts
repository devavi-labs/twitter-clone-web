import { Cache, Data } from "@urql/exchange-graphcache";
import {
  FollowMutationVariables,
  MeDocument,
  MeQuery,
  MeQueryVariables,
  RegularUserFragment,
  RegularUserFragmentDoc,
  UnfollowMutationVariables,
} from "../generated/graphql";

export function updateFollowOrUnfollow<
  V extends FollowMutationVariables | UnfollowMutationVariables
>({
  type,
  cache,
  args,
}: {
  type: "follow" | "unfollow";
  cache: Cache;
  args: V;
}) {
  const { userId } = args as V;

  const entity = { __typename: "User", id: userId } as const;
  const _key = cache.keyOfEntity(entity);
  const _user =
    _key &&
    cache.readFragment<RegularUserFragment>(RegularUserFragmentDoc, _key);

  const _meQuery = cache.readQuery<MeQuery, MeQueryVariables>({
    query: MeDocument,
  });

  if (_meQuery?.me && _user) {
    let _updatedUser: Partial<RegularUserFragment> = entity;

    let _updatedMe: Partial<RegularUserFragment> = {
      __typename: "User",
      id: _meQuery.me.id,
    };

    _updatedUser.followStatus = type === "follow";

    if (type === "follow") {
      _updatedMe.followings = _meQuery.me.followings
        ? _meQuery.me.followings + 1
        : 1;
      _updatedUser.followers = _user.followers ? _user.followers + 1 : 1;
    } else if (type === "unfollow") {
      _updatedMe.followings = _meQuery.me.followings
        ? _meQuery.me.followings - 1
        : 0;
      _updatedUser.followers = _user.followers ? _user.followers - 1 : 0;
    }

    cache.writeFragment(MeDocument, _updatedMe);

    return _updatedUser as Data;
  }

  return null;
}
