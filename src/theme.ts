import { createMuiTheme } from "@material-ui/core/styles";

export const light = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: "#1EA1F2",
    },
    secondary: {
      main: "#FFFFFF",
    },
  },
});

export const dark = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#FFFFFF",
    },
  },
});
