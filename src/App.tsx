import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { Routes } from "./Routes";
import { light } from "./theme";

function App() {
  return (
    <ThemeProvider theme={light}>
      <CssBaseline />
      <Routes />
    </ThemeProvider>
  );
}

export default App;
