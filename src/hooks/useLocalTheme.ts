import React from "react";
import { ThemeContext, ThemeState } from "../global";

export const useLocalTheme = (): [
  ThemeState,
  {
    initialize: () => void;
    toggle: (theme: "light" | "dark") => void;
  }
] => {
  const { state, dispatch } = React.useContext(ThemeContext);

  const toggle = (theme: "light" | "dark") =>
    dispatch({
      type: "TOGGLE",
      payload: theme,
    });

  const initialize = () => dispatch({ type: "GET" });

  return [state, { initialize, toggle }];
};
