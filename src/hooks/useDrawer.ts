import React from "react";
import { DrawerContext, DrawerState } from "../global";

export const useDrawer = (): [
  DrawerState,
  { handleOpen: () => void; handleClose: () => void }
] => {
  const { state, dispatch } = React.useContext(DrawerContext);

  const handleOpen = (onClose?: (() => void) | undefined) => {
    dispatch({
      type: "OPEN",
      payload: { onClose: onClose || handleClose },
    });
  };

  const handleClose = () => {
    dispatch({
      type: "CLOSE",
    });
  };

  return [state, { handleOpen, handleClose }];
};
