import { authExchange as authE } from "@urql/exchange-auth";
import { makeOperation } from "urql";
import { LogoutDocument } from "../generated/graphql";
import { REST_ENDPOINT } from "./constants";
import { getTokens, saveTokens, validateToken } from "./manageTokens";

interface AuthState {
  accessToken: string;
  refreshToken: string;
}

export const authExchange = authE<AuthState>({
  addAuthToOperation: ({ authState, operation }) => {
    if (!authState || !authState.accessToken) {
      return operation;
    }

    const fetchOptions =
      typeof operation.context.fetchOptions === "function"
        ? operation.context.fetchOptions()
        : operation.context.fetchOptions || {};

    return makeOperation(operation.kind, operation, {
      ...operation.context,
      fetchOptions: {
        ...fetchOptions,
        headers: {
          ...fetchOptions.headers,
          Authorization: "Bearer " + authState.accessToken,
        },
      },
    });
  },
  willAuthError: ({ authState }) => {
    if (!authState || validateToken(authState?.accessToken)) return true;
    return false;
  },
  didAuthError: ({ error }) => {
    return error.graphQLErrors.some((e) =>
      e.message.includes("Access denied!")
    );
  },
  getAuth: async ({ authState, mutate }) => {
    const { accessToken, refreshToken } = getTokens();
    if (!authState) {
      if (
        accessToken &&
        validateToken(accessToken) &&
        refreshToken &&
        validateToken(refreshToken)
      ) {
        return { accessToken, refreshToken };
      }
    }

    if (refreshToken && validateToken(refreshToken)) {
      const result = await fetch(REST_ENDPOINT + "/refresh_token", {
        method: "post",
        credentials: "include",
        headers: new Headers({
          Authorization: "Basic " + refreshToken,
          "Content-Type": "application/json",
        }),
      });

      if (result.ok) {
        const { accessToken: newAT, refreshToken: newRT } = await result.json();
        saveTokens(newAT, newRT);
        return { accessToken: newAT!, refreshToken: newRT! };
      } else mutate(LogoutDocument);
    }

    return null;
  },
});
