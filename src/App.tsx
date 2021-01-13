import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import { useContext } from "react";
import { ConfirmDialog, Splash } from "./components";
import { ThemeContext } from "./context/theme";
import { ToastContext } from "./context/toast";
import { useMeQuery } from "./generated/graphql";
import { Routes } from "./Routes";
import { dark, light } from "./theme";
import { Toast } from "./components";
import { ConfirmDialogContext } from "./context/confimDialog";

function App() {
  const { theme } = useContext(ThemeContext)!;

  const { open, onClose, message } = useContext(ToastContext)!;
  const { handleOpen: _, ...confirmDialogProps } = useContext(
    ConfirmDialogContext
  )!;

  const [{ fetching }] = useMeQuery();
  return (
    <ThemeProvider theme={theme === "light" ? light : dark}>
      <CssBaseline />
      {fetching ? <Splash /> : <Routes />}
      <Toast open={open} onClose={onClose} message={message} />
      <ConfirmDialog {...confirmDialogProps} />
    </ThemeProvider>
  );
}

export default App;
