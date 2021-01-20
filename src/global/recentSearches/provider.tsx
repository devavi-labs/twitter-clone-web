import { useReducer } from "react";
import {
  initialRecentSearches,
  RecentSearchesContext,
  recentSearchesReducer,
} from ".";

export const RecentSearchesProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(
    recentSearchesReducer,
    initialRecentSearches
  );
  return (
    <RecentSearchesContext.Provider value={{ state, dispatch }}>
      {children}
    </RecentSearchesContext.Provider>
  );
};
