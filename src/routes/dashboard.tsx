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
      <Route exact path="/explore/tabs/world">
        <Explore tab={0} />
      </Route>
      <Route exact path="/explore/tabs/health">
        <Explore tab={1} />
      </Route>
      <Route exact path="/explore/tabs/science">
        <Explore tab={2} />
      </Route>
      <Route exact path="/explore/tabs/sports">
        <Explore tab={3} />
      </Route>
      <Route exact path="/explore/tabs/business">
        <Explore tab={4} />
      </Route>
      <Route exact path="/explore/tabs/movies">
        <Explore tab={5} />
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