import { useReducer } from "react";
import {
  InstantSearchContext,
  initialInstantSearchState,
  instantSearchReducer,
} from ".";

export const InstantSearchProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(
    instantSearchReducer,
    initialInstantSearchState
  );
  return (
    <InstantSearchContext.Provider value={{ state, dispatch }}>
      {children}
    </InstantSearchContext.Provider>
  );
};
