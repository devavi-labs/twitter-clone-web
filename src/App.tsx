import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import React, { useContext } from "react";
import { ConfirmDialog, Splash, Toast } from "./components";
import { ConfirmDialogContext } from "./context/confimDialog";
import { ThemeContext } from "./context/theme";
import { ToastContext } from "./context/toast";
import { useMeQuery } from "./generated/graphql";
import { ModalRoutes, Routes } from "./routes";
import { dark, light } from "./theme";

function App() {
  const { theme } = useContext(ThemeContext)!;

  const { handleOpen: _, ...toastProps } = useContext(ToastContext)!;
  const { handleOpen: __, ...confirmDialogProps } = useContext(
    ConfirmDialogContext
  )!;

  const [{ fetching }] = useMeQuery();

  return (
    <ThemeProvider theme={theme === "light" ? light : dark}>
      <CssBaseline />
      {fetching ? (
        <Splash />
      ) : (
        <React.Fragment>
          <Routes />
          <ModalRoutes />
        </React.Fragment>
      )}
      <Toast {...toastProps} />
      <ConfirmDialog {...confirmDialogProps} />
    </ThemeProvider>
  );
}

export default App;
