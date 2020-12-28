import { createMuiTheme } from "@material-ui/core/styles";
import { TypographyOptions } from "@material-ui/core/styles/createTypography";

const typography: TypographyOptions = {
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
};

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
  typography,
});

export const dark = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#1EA1F2",
    },
    secondary: {
      main: "#000000",
    },
    tonalOffset: 0.3,
  },
  typography,
});
