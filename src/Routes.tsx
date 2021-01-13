import { BrowserRouter as Router, Switch } from "react-router-dom";
import { ProtectedRoute } from "./components";
import { Dashboard } from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { Logout } from "./pages/Logout";

export const Routes = () => {
  return (
    <Router>
      <Switch>
        <ProtectedRoute
          path="/signup"
          exact
          ProtectedComponent={<Home popup="signup" />}
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
        <ProtectedRoute
          path="/home"
          exact
          ProtectedComponent={<Dashboard feed="home" />}
          redirectPath="/"
          redirectState={{ from: "/home" }}
        />
        <ProtectedRoute
          path="/compose/quack"
          exact
          ProtectedComponent={<Dashboard feed="home" popup="compose-quack" />}
          redirectPath="/login"
          redirectState={{ from: "/compose/quack" }}
        />
        <ProtectedRoute
          path="/i/display"
          exact
          ProtectedComponent={
            <Dashboard feed="home" popup="display-settings" />
          }
          redirectPath="/login"
          redirectState={{ from: "/i/display" }}
        />
        <ProtectedRoute
          path="/"
          exact
          ProtectedComponent={<Home />}
          redirectPath="/home"
          reverse
        />
        <ProtectedRoute
          path="/"
          ProtectedComponent={<Dashboard feed="profile" />}
          FallbackComponent={<Home />}
        />
      </Switch>
    </Router>
  );
};
