import React from "react";
import { InstantSearchContext, InstantSearchState } from "../global";

export const useInstantSearch = (): [
  InstantSearchState,
  {
    handleOpen: () => void;
    handleClose: () => void;
    handleQueryUpdate: (query: string) => void;
  }
] => {
  const { state, dispatch } = React.useContext(InstantSearchContext);

  const handleOpen = () => dispatch({ type: "OPEN" });

  const handleClose = () => dispatch({ type: "CLOSE" });

  const handleQueryUpdate = (query: string) =>
    dispatch({ type: "UPDATE_QUERY", payload: { query } });

  return [state, { handleOpen, handleClose, handleQueryUpdate }];
};
