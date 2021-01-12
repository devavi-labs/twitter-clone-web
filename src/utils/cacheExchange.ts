import { cacheExchange as CE } from "@urql/exchange-graphcache";
import {
  LoginMutation,
  LogoutMutation,
  MeDocument,
  MeQuery,
  SignupMutation,
} from "../generated/graphql";
import { betterUpdateQuery } from "./betterUpdateQuery";
import { quacksPagination } from "./quacksPagination";

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
    },
  },
});
