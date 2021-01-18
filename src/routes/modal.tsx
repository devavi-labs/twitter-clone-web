import React from "react";
import { Switch } from "react-router-dom";
import {
  SignupModal,
  ProtectedRoute,
  CreateQuackModal,
  DisplaySettingsModal,
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
    </Switch>
  );
};
