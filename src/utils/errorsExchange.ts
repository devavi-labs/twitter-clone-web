import { Exchange } from "urql";
import { pipe, tap } from "wonka";

export const errorsExchange: Exchange = ({ forward }) => (ops$) => {
  return pipe(
    forward(ops$),
    tap(({ error }) => {
      if (error) {
        if (error?.message.includes("Not Authenticated")) {
          return (window.location.pathname = "/login");
        }
      }
    })
  );
};
