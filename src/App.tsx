import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import React from "react";
import { ConfirmDialog, Splash, Toast } from "./components";
import { useMeQuery } from "./generated/graphql";
import { useLocalTheme } from "./hooks";
import { ModalRoutes, Routes } from "./routes";
import { dark, light } from "./theme";

const App: React.FC = () => {
  const [themeState, { initialize: initializeTheme }] = useLocalTheme();

  React.useEffect(() => {
    initializeTheme();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [{ fetching }] = useMeQuery();

  return (
    <ThemeProvider theme={themeState.theme === "light" ? light : dark}>
      <CssBaseline />
      {fetching ? (
        <Splash />
      ) : (
        <React.Fragment>
          <Routes />
          <ModalRoutes />
        </React.Fragment>
      )}

      <Toast />
      <ConfirmDialog />
    </ThemeProvider>
  );
};

export default App;
