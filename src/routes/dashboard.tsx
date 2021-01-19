import { Switch, Route, useLocation } from "react-router-dom";
import { ProtectedRoute } from "../components";
import { Feed } from "../pages/Feed";
import { ProfilePage } from "../pages/Profile";
import { RouteStateType } from ".";
import { Explore } from "../pages/Explore";

export const DashboardRoutes = () => {
  const location = useLocation<RouteStateType>();
  const background = location.state ? location.state.background : undefined;

  return (
    <Switch location={background || location}>
      <ProtectedRoute
        path="/home"
        exact
        ProtectedComponent={<Feed />}
        redirectPath="/"
        redirectState={{ from: "/home" }}
      />
      <Route exact path="/explore">
        <Explore />
      </Route>
      <Route path="/:username" exact>
        <ProfilePage tab={0} />
      </Route>
      <Route path="/:username/requacks" exact>
        <ProfilePage tab={1} />
      </Route>
      <Route path="/:username/likes" exact>
        <ProfilePage tab={2} />
      </Route>
    </Switch>
  );
};
