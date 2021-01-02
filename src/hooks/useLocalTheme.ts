import { useMediaQuery } from "@material-ui/core";
import { LOCAL_THEME } from "../utils/constants";

export const useLocalTheme = () => {
  let prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const localTheme = localStorage.getItem(LOCAL_THEME);

  if (localTheme) {
    prefersDarkMode = localTheme === "dark";
  }

  return prefersDarkMode ? "dark" : "light";
};
