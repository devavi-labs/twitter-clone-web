import React from "react";
import { RecentSearchesContext, RecentSearchesState } from "../global";

export const useRecentSearches = (): [
  RecentSearchesState,
  {
    initialize: () => void;
    pushSearch: (search: string) => void;
    removeRecentSearch: (recentSearch: string) => void;
    clearRecentSearches: () => void;
  }
] => {
  const { state, dispatch } = React.useContext(RecentSearchesContext);

  const initialize = () => dispatch({ type: "GET" });

  const pushSearch = (search: string) =>
    dispatch({
      type: "PUSH",
      payload: search,
    });

  const removeRecentSearch = (recentSearch: string) =>
    dispatch({
      type: "PULL",
      payload: recentSearch,
    });

  const clearRecentSearches = () =>
    dispatch({
      type: "FLUSH",
    });

  return [
    state,
    {
      initialize,
      pushSearch,
      removeRecentSearch,
      clearRecentSearches,
    },
  ];
};
