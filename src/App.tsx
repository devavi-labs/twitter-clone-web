import { CssBaseline, ThemeProvider, useMediaQuery } from "@material-ui/core";
import { Routes } from "./Routes";
import { light, dark } from "./theme";

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  return (
    <ThemeProvider theme={prefersDarkMode ? dark : light}>
      <CssBaseline />
      <Routes />
    </ThemeProvider>
  );
}

export default App;
