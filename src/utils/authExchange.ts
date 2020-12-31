import { authExchange as authE } from "@urql/exchange-auth";
import Cookies from "js-cookie";
import { makeOperation } from "urql";
import { LogoutDocument } from "../generated/graphql";
import { ACCESS_TOKEN, REFRESH_TOKEN, REST_ENDPOINT } from "./constants";

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
    if (!authState) return true;
    return false;
  },
  didAuthError: ({ error }) => {
    return error.graphQLErrors.some((e) =>
      e.message.includes("Access denied!")
    );
  },
  getAuth: async ({ authState, mutate }) => {
    const refreshToken = Cookies.get(REFRESH_TOKEN);
    console.log("refreshToken: ", refreshToken);
    if (!authState) {
      const accessToken = Cookies.get(ACCESS_TOKEN);
      console.log("accessToken: ", accessToken);
      if (accessToken && refreshToken) {
        return { accessToken, refreshToken };
      }
    }

    if (refreshToken) {
      const result = await fetch(REST_ENDPOINT + "/refresh_token", {
        method: "post",
        credentials: "include",
        headers: new Headers({
          Authorization: "Basic " + refreshToken,
          "Content-Type": "application/json",
        }),
      });

      if (result.ok) {
        const newAT = Cookies.get(ACCESS_TOKEN);
        const newRT = Cookies.get(REFRESH_TOKEN);
        return { accessToken: newAT!, refreshToken: newRT! };
      } else mutate(LogoutDocument);
    }

    return null;
  },
});
