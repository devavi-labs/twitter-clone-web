import React, { useState } from "react";
import { useLocalTheme } from "../hooks/useLocalTheme";
import { ThemeContext } from "./theme";

export const ContextProvider: React.FC = ({ children }) => {
  const localTheme = useLocalTheme();
  const [theme, toggleTheme] = useState<"dark" | "light">(
    localTheme || "light"
  );

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
