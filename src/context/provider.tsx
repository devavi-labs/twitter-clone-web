import React from "react";
import { useLocalTheme } from "../hooks/useLocalTheme";
import { ThemeContext } from "./theme";

export const ContextProvider: React.FC = ({ children }) => {
  const { theme, toggleTheme } = useLocalTheme();

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
