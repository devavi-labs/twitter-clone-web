import { BrowserRouter as Router, Switch } from "react-router-dom";
import { ProtectedRoute } from "./components";
import { Dashboard } from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";

export const Routes = () => {
  return (
    <Router>
      <Switch>
        <ProtectedRoute
          path="/signup"
          exact
          ProtectedComponent={Home}
          redirectPath="/home"
          reverse
        />
        <ProtectedRoute
          path="/login"
          exact
          ProtectedComponent={Login}
          redirectPath="/home"
          reverse
        />
        <ProtectedRoute
          path="/home"
          exact
          ProtectedComponent={Dashboard}
          redirectPath="/"
        />
        <ProtectedRoute
          path="/"
          exact
          ProtectedComponent={Home}
          redirectPath="/home"
          reverse
        />
        <ProtectedRoute
          path="/"
          ProtectedComponent={Dashboard}
          FallbackComponent={Home}
        />
      </Switch>
    </Router>
  );
};
