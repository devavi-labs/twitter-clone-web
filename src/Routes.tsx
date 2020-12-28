import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Splash } from "./components";
const Home = lazy(() => import("./pages/Home"));

export const Routes = () => (
  <Router>
    <Suspense fallback={<Splash />}>
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
    </Suspense>
  </Router>
);
