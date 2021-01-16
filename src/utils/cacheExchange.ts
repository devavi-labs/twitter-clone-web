import { cacheExchange as CE } from "@urql/exchange-graphcache";
import {
  BlockMutationVariables,
  DeleteQuackMutationVariables,
  FollowMutationVariables,
  LikeMutationVariables,
  LoginMutation,
  LogoutMutation,
  MeDocument,
  MeQuery,
  RequackMutationVariables,
  SignupMutation,
  UnblockMutationVariables,
  UnfollowMutationVariables,
} from "../generated/graphql";
import schema from "../generated/schema.json";
import { betterUpdateQuery } from "./betterUpdateQuery";
import { pagination } from "./pagination";
import { updateBlockOrUnblock } from "./updateBlockOrUnblock";
import { updateFollowOrUnfollow } from "./updateFollowOrUnfollow";
import { updateLikeOrRequack } from "./updateLikeOrRequack";

export const cacheExchange = CE({
  schema: schema as any,
  keys: {
    PaginatedQuacks: () => null,
  },
  resolvers: {
    Query: {
      quacksForMe: pagination("quacks", "PaginatedQuacks"),
      quacksFromUser: pagination("quacks", "PaginatedQuacks"),
      requacksByUserId: pagination("quacks", "PaginatedQuacks"),
      likesByUserId: pagination("quacks", "PaginatedQuacks"),
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
    },
  },
  optimistic: {
    like: (args, cache) =>
      updateLikeOrRequack({
        type: "like",
        args: args as LikeMutationVariables,
        cache,
      }),
    requack: (args, cache) =>
      updateLikeOrRequack({
        type: "requack",
        args: args as RequackMutationVariables,
        cache,
      }),
    follow: (args, cache) =>
      updateFollowOrUnfollow<FollowMutationVariables>({
        type: "follow",
        cache,
        args: args as FollowMutationVariables,
      }),
    unfollow: (args, cache) =>
      updateFollowOrUnfollow<UnfollowMutationVariables>({
        type: "unfollow",
        cache,
        args: args as UnfollowMutationVariables,
      }),
    block: (args, cache) =>
      updateBlockOrUnblock<BlockMutationVariables>({
        type: "block",
        cache,
        args: args as BlockMutationVariables,
      }),
    unblock: (args, cache) =>
      updateBlockOrUnblock<UnblockMutationVariables>({
        type: "unblock",
        cache,
        args: args as UnblockMutationVariables,
      }),
  },
});
