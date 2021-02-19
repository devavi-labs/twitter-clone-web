export type ContextType<S, A> = {
  state: S;
  dispatch: React.Dispatch<A>;
};
export { GlobalContextProvider } from "./provider";
export {
  ConfirmDialogContext,
  ConfirmDialogProvider,
  confirmDialogReducer,
  initialConfirmDialogState,
} from "./confirmDialog";
export type {
  ConfirmDialogState,
  ConfirmDialogAction,
  ConfirmDialogContextType,
} from "./confirmDialog";
export {
  DrawerContext,
  DrawerProvider,
  drawerReducer,
  initialDrawerState,
} from "./drawer";
export type { DrawerState, DrawerAction, DrawerContextType } from "./drawer";
export {
  InstantSearchContext,
  InstantSearchProvider,
  initialInstantSearchState,
  instantSearchReducer,
} from "./instantSearch";
export type {
  InstantSearchState,
  InstantSearchAction,
  InstantSearchContextType,
} from "./instantSearch";
export {
  RecentSearchesContext,
  RecentSearchesProvider,
  initialRecentSearches,
  recentSearchesReducer,
} from "./recentSearches";
export type {
  RecentSearchesState,
  RecentSearchesAction,
  RecentSearchesContextType,
} from "./recentSearches";
export {
  ThemeContext,
  ThemeProvider,
  initialThemeState,
  themeReducer,
} from "./theme";
export type { ThemeState, ThemeAction, ThemeContextType } from "./theme";
export {
  ToastContext,
  ToastProvider,
  initialToastState,
  toastReducer,
} from "./toast";
export type { ToastState, ToastAction, ToastContextType } from "./toast";
