import { cacheExchange as CE } from "@urql/exchange-graphcache";
import {
  LikeMutationVariables,
  LoginMutation,
  LogoutMutation,
  MeDocument,
  MeQuery,
  RequackMutationVariables,
  SignupMutation,
} from "../generated/graphql";
import { betterUpdateQuery } from "./betterUpdateQuery";
import { quacksPagination } from "./quacksPagination";
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
    },
  },
});
