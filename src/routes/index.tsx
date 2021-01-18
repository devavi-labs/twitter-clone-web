import { Switch, Route, useLocation } from "react-router-dom";
import { Location } from "history";
import { ProtectedRoute, Dashboard } from "../components";
import Home from "../pages/Home";
import Login from "../pages/Login";
import { Logout } from "../pages/Logout";

export type RouteStateType = {
  from?: Location;
  background?: Location;
};

export const Routes = () => {
  const location = useLocation<RouteStateType>();
  const background = location.state ? location.state.background : undefined;
  return (
    <Switch location={background || location}>
      <ProtectedRoute
        path="/"
        exact
        ProtectedComponent={<Home />}
        redirectPath="/home"
        reverse
      />
      <ProtectedRoute
        path="/login"
        exact
        ProtectedComponent={<Login />}
        redirectPath="/home"
        reverse
      />
      <ProtectedRoute
        path="/logout"
        exact
        ProtectedComponent={<Logout />}
        redirectPath="/login"
      />

      <Route path="/">
        <Dashboard />
      </Route>
    </Switch>
  );
};

export { ModalRoutes } from "./modal";
export { DashboardRoutes } from "./dashboard";
