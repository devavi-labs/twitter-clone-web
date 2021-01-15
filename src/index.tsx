import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "urql";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { createUrqlClient } from "./utils/createUrqlClient";
import { ContextProvider } from "./context/provider";

const client = createUrqlClient();

ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
      <Provider value={client}>
        <App />
      </Provider>
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorkerRegistration.register();
