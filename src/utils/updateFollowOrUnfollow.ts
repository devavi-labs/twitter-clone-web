import { Cache } from "@urql/exchange-graphcache";
import {
  FollowMutation,
  FollowMutationVariables,
  MeDocument,
  MeQuery,
  MeQueryVariables,
  RegularUserFragment,
  RegularUserFragmentDoc,
  UnfollowMutation,
  UnfollowMutationVariables,
} from "../generated/graphql";

export function updateFollowOrUnfollow<
  T extends FollowMutation | UnfollowMutation,
  V extends FollowMutationVariables | UnfollowMutationVariables
>({
  type,
  cache,
  args,
  data,
}: {
  type: "follow" | "unfollow";
  cache: Cache;
  args: V;
  data: T;
}) {
  const _me = cache.readQuery<MeQuery, MeQueryVariables>({
    query: MeDocument,
  });
  const { userId } = args as V;
  const _key = cache.keyOfEntity({ __typename: "User", id: userId });
  const _user =
    _key &&
    cache.readFragment<RegularUserFragment>(RegularUserFragmentDoc, _key);

  if (_me && _user) {
    if (
      (type === "follow" && (data as FollowMutation).follow) ||
      (type === "unfollow" && (data as UnfollowMutation).unfollow)
    ) {
      let followings: number = _me.me?.followings ? _me.me?.followings + 1 : 1;
      let followers: number = _user.followers ? _user.followers + 1 : 1;

      if (type === "follow") {
        followings = _me.me?.followings ? _me.me?.followings + 1 : 1;
        followers = _user.followers ? _user.followers + 1 : 1;
      } else if (type === "unfollow") {
        followings = _me.me?.followings ? _me.me?.followings - 1 : 0;
        followers = _user.followers ? _user.followers - 1 : 0;
      }

      cache.writeFragment(MeDocument, { ..._me.me, followings });
      cache.writeFragment(RegularUserFragmentDoc, {
        ..._user,
        followers,
        followStatus: type === "follow",
      });
    }
  }
}
