import { createContext } from "react";
import { ContextType } from "..";
import { RecentSearchesAction, initialRecentSearches } from ".";

export type RecentSearchesState = {
  searches: Array<string>;
};

export type RecentSearchesContextType = ContextType<
  RecentSearchesState,
  RecentSearchesAction
>;

export const RecentSearchesContext = createContext<RecentSearchesContextType>({
  state: initialRecentSearches,
  dispatch: () => null,
});
