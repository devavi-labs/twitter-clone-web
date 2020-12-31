import { CssBaseline, ThemeProvider, useMediaQuery } from "@material-ui/core";
import { Splash } from "./components";
import { useMeQuery } from "./generated/graphql";
import { Routes } from "./Routes";
import { dark, light } from "./theme";

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const [{ fetching }] = useMeQuery();
  return (
    <ThemeProvider theme={prefersDarkMode ? dark : light}>
      <CssBaseline />
      {fetching ? <Splash /> : <Routes />}
    </ThemeProvider>
  );
}

export default App;
