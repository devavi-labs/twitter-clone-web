import { createContext, Dispatch, SetStateAction } from "react";

export interface ThemeContextType {
  theme: "dark" | "light";
  toggleTheme: Dispatch<SetStateAction<"dark" | "light">>;
}

export const ThemeContext = createContext<ThemeContextType | null>(null);
