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
  QuackMutation,
  QuacksFromUserDocument,
  QuacksForMeDocument,
  QuacksForMeQueryVariables,
  RequackMutationVariables,
  SignupMutation,
  UnblockMutation,
  UnblockMutationVariables,
  UnfollowMutation,
  UnfollowMutationVariables,
  QuacksFromUserQueryVariables,
  QuacksForMeQuery,
  QuacksFromUserQuery,
  RegularQuackFragmentDoc,
  RegularQuackFragment,
} from "../generated/graphql";
import { betterUpdateQuery } from "./betterUpdateQuery";
import { pagination } from "./pagination";
import { updateBlockOrUnblock } from "./updateBlockOrUnblock";
import { updateFollowOrUnfollow } from "./updateFollowOrUnfollow";
import { updateLikeOrRequack } from "./updateLikeOrRequack";
import schema from "../generated/schema.json";

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
      quack: (data, _, cache) => {
        const {
          quack: { quack },
        } = data as QuackMutation;

        if (quack) {
          cache.updateQuery(
            {
              query: QuacksForMeDocument,
              variables: {
                limit: 20,
                lastIndex: null,
              } as QuacksForMeQueryVariables,
            },
            (data) => {
              if (data) {
                const { quacksForMe } = data as QuacksForMeQuery;
                quacksForMe?.quacks?.unshift(quack);
              }
              return data;
            }
          );

          cache.updateQuery(
            {
              query: QuacksFromUserDocument,
              variables: {
                userId: quack.quackedByUser.id,
                limit: 20,
                lastIndex: null,
              } as QuacksFromUserQueryVariables,
            },
            (data) => {
              if (data) {
                const { quacksFromUser } = data as QuacksFromUserQuery;
                quacksFromUser?.quacks?.unshift(quack);
              }
              return data;
            }
          );

          if (quack.inReplyToQuack) {
            const _quack = cache.readFragment<RegularQuackFragment>(
              RegularQuackFragmentDoc,
              { __typename: "Quack", id: quack.inReplyToQuack.id }
            );

            if (_quack) {
              const replies = _quack.replies
                ? [quack, ..._quack.replies]
                : [quack];

              cache.writeFragment(RegularQuackFragmentDoc, {
                ..._quack,
                replies,
              });
            }
          }
        }
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
