import { authExchange as authE } from "@urql/exchange-auth";
import { makeOperation } from "urql";
import { LogoutDocument } from "../generated/graphql";
import { REST_ENDPOINT } from "./constants";
import { getTokens, removeTokens, saveTokens } from "./manageTokens";

interface AuthState {
  accessToken: string;
}

export const authExchange = authE<AuthState>({
  addAuthToOperation: ({ authState, operation }) => {
    if (
      (operation.query.definitions[0] as { name: { value: any } })?.name
        .value === "Logout"
    ) {
      removeTokens();
    }

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
    if (!authState) return true;
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
      if (accessToken) {
        return { accessToken };
      } else if (refreshToken) {
        const result = await fetch(REST_ENDPOINT + "/refresh_token", {
          method: "post",
          credentials: "include",
          headers: new Headers({
            Authorization: "Basic " + refreshToken,
            "Content-Type": "application/json",
          }),
        });

        if (result.ok) {
          const {
            accessToken: newAT,
            refreshToken: newRT,
          } = await result.json();
          saveTokens(newAT, newRT);
          return { accessToken: newAT! };
        } else {
          removeTokens();
          mutate(LogoutDocument);
        }
      }
      return null;
    }
    return authState;
  },
});
