import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import { useContext } from "react";
import { Splash } from "./components";
import { ThemeContext } from "./context/theme";
import { useMeQuery } from "./generated/graphql";
import { Routes } from "./Routes";
import { dark, light } from "./theme";

function App() {
  const { theme } = useContext(ThemeContext)!;

  const [{ fetching }] = useMeQuery();
  return (
    <ThemeProvider theme={theme === "light" ? light : dark}>
      <CssBaseline />
      {fetching ? <Splash /> : <Routes />}
    </ThemeProvider>
  );
}

export default App;
