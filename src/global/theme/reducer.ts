import { ThemeState, TOGGLE, GET } from ".";
import { LOCAL_THEME } from "../../utils/constants";

export type ThemeAction = {
  type: typeof TOGGLE | typeof GET;
  payload?: "light" | "dark";
};

export const initialThemeState: ThemeState = {
  theme: "light",
};

export const themeReducer = (
  state: ThemeState = initialThemeState,
  action: ThemeAction
): ThemeState => {
  switch (action.type) {
    case GET: {
      const localTheme = localStorage.getItem(LOCAL_THEME) as
        | "dark"
        | "light"
        | null;

      if (localTheme) {
        return {
          theme: localTheme,
        };
      }

      return state;
    }

    case TOGGLE: {
      localStorage.setItem(LOCAL_THEME, action.payload || state.theme);

      return {
        theme: action.payload || state.theme,
      };
    }

    default:
      return state;
  }
};
