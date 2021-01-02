import React, { FC } from "react";
import { Route, RouteProps, useHistory } from "react-router-dom";
import { useMeQuery } from "../generated/graphql";
import { Splash } from "./Splash";

interface ProtectedRouteProps {
  ProtectedComponent: JSX.Element;
  FallbackComponent?: JSX.Element;
  redirectPath?: string;
  redirectState?: any;
  reverse?: boolean;
}

export const ProtectedRoute: FC<ProtectedRouteProps & RouteProps> = ({
  ProtectedComponent,
  FallbackComponent,
  redirectPath,
  redirectState,
  reverse = false,
  ...props
}) => {
  const [{ data, fetching, stale }] = useMeQuery();

  const history = useHistory();

  let C: void | JSX.Element = <Splash />;

  if (fetching || stale) {
    C = <Splash />;
  }

  if (data?.me) {
    C = reverse
      ? FallbackComponent
        ? FallbackComponent
        : history.push(redirectPath || "/login", redirectState)
      : ProtectedComponent;
  } else {
    C = reverse
      ? ProtectedComponent
      : FallbackComponent
      ? FallbackComponent
      : history.push(redirectPath || "/login", redirectState);
  }

  return (
    <Route {...props}>
      <>{C}</>
    </Route>
  );
};
