import React from "react";
import { ToastContext, ToastState } from "../global";

export const useToast = (): [
  ToastState,
  {
    handleOpen: (message: string, onClose?: (() => void) | undefined) => void;
    handleClose: () => void;
  }
] => {
  const { state, dispatch } = React.useContext(ToastContext);

  const handleOpen = (message: string, onClose?: () => void) => {
    dispatch({
      type: "OPEN",
      payload: {
        message,
        onClose: onClose || handleClose,
      },
    });
  };

  const handleClose = () => {
    dispatch({ type: "CLOSE" });
  };

  return [state, { handleOpen, handleClose }];
};
