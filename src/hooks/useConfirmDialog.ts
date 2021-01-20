import React from "react";
import { ConfirmDialogContext, ConfirmDialogState } from "../global";

export const useConfirmDialog = (): [
  ConfirmDialogState,
  {
    handleOpen: (props: Omit<ConfirmDialogState, "open">) => void;
    handleClose: () => void;
  }
] => {
  const { state, dispatch } = React.useContext(ConfirmDialogContext);

  const handleOpen = (props: Omit<ConfirmDialogState, "open">) =>
    dispatch({
      type: "OPEN",
      payload: {
        ...props,
        onClose: props.onClose || handleClose,
        onCancel: props.onCancel || handleClose,
        onConfirm: props.onConfirm || handleClose,
      },
    });

  const handleClose = () => dispatch({ type: "CLOSE" });

  return [state, { handleOpen, handleClose }];
};
