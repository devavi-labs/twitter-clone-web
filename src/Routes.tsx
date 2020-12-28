import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
const Home = lazy(() => import("./pages/Home"));

export const Routes = () => (
  <Router>
    <Suspense fallback={<div>loading..</div>}>
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
    </Suspense>
  </Router>
);
