import React from "react";
import { RECENT_SEARCHES } from "../utils/constants";
import { isEqual } from "lodash";

export const useRecentSearches = () => {
  const [searches, setSearches] = React.useState<string[] | null>(null);

  const setRecentSearches = (searches: string[]) => {
    setSearches(searches);
    localStorage.setItem(RECENT_SEARCHES, JSON.stringify(searches));
  };

  const getRecentSearches = (): string[] | null => {
    const string = localStorage.getItem(RECENT_SEARCHES);

    if (string) {
      return JSON.parse(string) as string[];
    } else return null;
  };

  const pushSearch = (search: string) => {
    const _searches = searches || [];
    _searches?.unshift(search);
    setRecentSearches(_searches);
  };

  const removeSearch = (search: string) => {
    const _searches = searches || [];
    if (_searches?.includes(search)) {
      _searches.splice(_searches.indexOf(search), 1);
      setRecentSearches(_searches);
    }
  };

  const removeAllRecentSearches = () => {
    localStorage.removeItem(RECENT_SEARCHES);
    setSearches([]);
  };

  React.useEffect(() => {
    const _searches = getRecentSearches();
    if (!isEqual(_searches, searches)) {
      setSearches(_searches);
    }
  }, [searches]);

  return { searches, pushSearch, removeSearch, removeAllRecentSearches };
};
