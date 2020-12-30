import { CssBaseline, ThemeProvider, useMediaQuery } from "@material-ui/core";
import { Provider } from "urql";
import { Routes } from "./Routes";
import { dark, light } from "./theme";
import { createUrqlClient } from "./utils/createUrqlClient";

const client = createUrqlClient();

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  return (
    <Provider value={client}>
      <ThemeProvider theme={prefersDarkMode ? dark : light}>
        <CssBaseline />
        <Routes />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
