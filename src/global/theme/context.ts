import { createContext } from "react";
import { ContextType } from "..";
import { ThemeAction, initialThemeState } from ".";

export type ThemeState = {
  theme: "dark" | "light";
};

export type ThemeContextType = ContextType<ThemeState, ThemeAction>;

export const ThemeContext = createContext<ThemeContextType>({
  state: initialThemeState,
  dispatch: () => null,
});
