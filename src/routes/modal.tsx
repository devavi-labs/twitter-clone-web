import React from "react";
import { Route, Switch } from "react-router-dom";
import {
  AdvancedSearchModal,
  CreateQuackModal,
  DisplaySettingsModal,
  DummyUserLoginModal,
  ProtectedRoute,
  SignupModal,
  QuackStatsModal,
} from "../components";

export const ModalRoutes = () => {
  return (
    <Switch>
      <ProtectedRoute
        path="/i/flow/signup"
        exact
        ProtectedComponent={<SignupModal open />}
        redirectPath="/home"
        reverse
      />
      <ProtectedRoute
        path="/i/flow/login-dummy"
        exact
        ProtectedComponent={<DummyUserLoginModal open />}
        redirectPath="/home"
        reverse
      />
      <ProtectedRoute
        path="/compose/quack"
        exact
        ProtectedComponent={<CreateQuackModal open />}
        redirectPath="/login"
        redirectState={{ from: "/compose/quack" }}
      />
      <ProtectedRoute
        path="/i/display"
        exact
        ProtectedComponent={<DisplaySettingsModal open />}
        redirectPath="/login"
        redirectState={{ from: "/i/display" }}
      />
      <Route exact path="/search-advanced">
        <AdvancedSearchModal open />
      </Route>
      <Route exact path="/:username/quack/:quackId/requacks">
        <QuackStatsModal type="requacks" />
      </Route>
      <Route exact path="/:username/quack/:quackId/likes">
        <QuackStatsModal type="likes" />
      </Route>
    </Switch>
  );
};
