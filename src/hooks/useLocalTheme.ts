import { useMediaQuery } from "@material-ui/core";
import { useState } from "react";
import { LOCAL_THEME } from "../utils/constants";

export const useLocalTheme = () => {
  const [theme, setTheme] = useState<"dark" | "light">("light");
  let prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const localTheme = localStorage.getItem(LOCAL_THEME) as
    | "dark"
    | "light"
    | null;

  const toggleTheme = (theme: "dark" | "light") => {
    localStorage.setItem(LOCAL_THEME, theme);
    setTheme(theme);
  };

  if (localTheme && theme !== localTheme) {
    setTheme(localTheme);
  } else if (!localTheme && prefersDarkMode && theme !== "dark") {
    setTheme("dark");
  }

  return { theme, toggleTheme };
};
