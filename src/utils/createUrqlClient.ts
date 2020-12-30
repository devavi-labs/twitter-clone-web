import { createClient, dedupExchange, fetchExchange } from "urql";
import { authExchange } from "./authExchange";
import { cacheExchange } from "./cacheExchange";
import { GRAPHQL_ENDPOINt } from "./constants";
import { errorsExchange } from "./errorsExchange";
import { createFetchOptions } from "./fetchOptions";

export const createUrqlClient = () =>
  createClient({
    url: GRAPHQL_ENDPOINt,
    fetchOptions: createFetchOptions(),
    exchanges: [
      dedupExchange,
      cacheExchange,
      authExchange,
      errorsExchange,
      fetchExchange,
    ],
  });
