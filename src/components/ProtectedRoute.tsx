import React, { FC } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { useMeQuery } from "../generated/graphql";
import { Splash } from "./Splash";

interface ProtectedRouteProps {
  ProtectedComponent: FC;
  redirectPath: string;
  reverse?: boolean;
}

export const ProtectedRoute: FC<ProtectedRouteProps & RouteProps> = ({
  ProtectedComponent,
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
    C = reverse ? <Redirect to={redirectPath} /> : <ProtectedComponent />;
  } else {
    C = reverse ? <ProtectedComponent /> : <Redirect to={redirectPath} />;
  }

  return <Route {...props}>{C}</Route>;
};
