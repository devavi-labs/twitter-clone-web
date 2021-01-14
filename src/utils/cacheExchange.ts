import { cacheExchange as CE } from "@urql/exchange-graphcache";
import {
  BlockMutation,
  BlockMutationVariables,
  DeleteQuackMutationVariables,
  FollowMutation,
  FollowMutationVariables,
  LikeMutationVariables,
  LoginMutation,
  LogoutMutation,
  MeDocument,
  MeQuery,
  RequackMutationVariables,
  SignupMutation,
  UnblockMutation,
  UnblockMutationVariables,
  UnfollowMutation,
  UnfollowMutationVariables,
} from "../generated/graphql";
import { betterUpdateQuery } from "./betterUpdateQuery";
import { quacksPagination } from "./quacksPagination";
import { updateBlockOrUnblock } from "./updateBlockOrUnblock";
import { updateFollowOrUnfollow } from "./updateFollowOrUnfollow";
import { updateLikeOrRequack } from "./updateLikeOrRequack";

export const cacheExchange = CE({
  keys: {
    PaginatedQuacks: () => null,
  },
  resolvers: {
    Query: {
      quacksForMe: quacksPagination(),
    },
  },
  updates: {
    Mutation: {
      logout: (result, _, cache) => {
        betterUpdateQuery<LogoutMutation, MeQuery>(
          cache,
          { query: MeDocument },
          result,
          () => ({ me: null })
        );
      },
      login: (_result, _, cache) => {
        betterUpdateQuery<LoginMutation, MeQuery>(
          cache,
          { query: MeDocument },
          _result,
          (result, query) => {
            if (result.login.errors) {
              return query;
            } else {
              return {
                me: result.login.user,
              };
            }
          }
        );
      },
      signup: (_result, _, cache) => {
        betterUpdateQuery<SignupMutation, MeQuery>(
          cache,
          { query: MeDocument },
          _result,
          (result, query) => {
            if (result.signup.errors) {
              return query;
            } else {
              return {
                me: result.signup.user,
              };
            }
          }
        );
      },
      deleteQuack: (_, args, cache) => {
        const _key = cache.keyOfEntity({
          __typename: "Quack",
          id: (args as DeleteQuackMutationVariables).quackId,
        });
        cache.invalidate(_key);
      },
      like: (_, args, cache, __) => {
        updateLikeOrRequack({
          type: "like",
          args: args as LikeMutationVariables,
          cache,
        });
      },
      requack: (_, args, cache, __) => {
        updateLikeOrRequack({
          type: "requack",
          args: args as RequackMutationVariables,
          cache,
        });
      },
      follow: (data, args, cache) => {
        updateFollowOrUnfollow<FollowMutation, FollowMutationVariables>({
          type: "follow",
          cache,
          args: args as FollowMutationVariables,
          data: data as FollowMutation,
        });
      },
      unfollow: (data, args, cache) => {
        updateFollowOrUnfollow<UnfollowMutation, UnfollowMutationVariables>({
          type: "unfollow",
          cache,
          args: args as UnfollowMutationVariables,
          data: data as UnfollowMutation,
        });
      },
      block: (data, args, cache) => {
        updateBlockOrUnblock({
          type: "block",
          cache,
          args: args as BlockMutationVariables,
          data: data as BlockMutation,
        });
      },
      unblock: (data, args, cache) => {
        updateBlockOrUnblock({
          type: "unblock",
          cache,
          args: args as UnblockMutationVariables,
          data: data as UnblockMutation,
        });
      },
    },
  },
});
