import { createContext } from "react";
import { ContextType } from "..";
import { InstantSearchAction, initialInstantSearchState } from ".";

export type InstantSearchState = {
  open: boolean;
  query: string;
};

export type InstantSearchContextType = ContextType<
  InstantSearchState,
  InstantSearchAction
>;

export const InstantSearchContext = createContext<InstantSearchContextType>({
  state: initialInstantSearchState,
  dispatch: () => null,
});
