import React, { FC } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { useMeQuery } from "../generated/graphql";
import { Splash } from "./Splash";

interface ProtectedRouteProps {
  ProtectedComponent: FC;
  FallbackComponent?: FC;
  redirectPath?: string;
  reverse?: boolean;
}

export const ProtectedRoute: FC<ProtectedRouteProps & RouteProps> = ({
  ProtectedComponent,
  FallbackComponent,
  redirectPath,
  reverse = false,
  ...props
}) => {
  const [{ data, fetching, stale }] = useMeQuery();

  let C = <Splash />;

  if (fetching || stale) {
    C = <Splash />;
  }

  if (data?.me) {
    C = reverse ? (
      FallbackComponent ? (
        <FallbackComponent />
      ) : (
        <Redirect to={redirectPath || "/login"} />
      )
    ) : (
      <ProtectedComponent />
    );
  } else {
    C = reverse ? (
      <ProtectedComponent />
    ) : FallbackComponent ? (
      <FallbackComponent />
    ) : (
      <Redirect to={redirectPath || "/login"} />
    );
  }

  return <Route {...props}>{C}</Route>;
};
