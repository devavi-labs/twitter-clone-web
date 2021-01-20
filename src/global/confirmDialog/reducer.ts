import { ConfirmDialogState, OPEN, CLOSE } from ".";

export type ConfirmDialogAction = {
  type: typeof OPEN | typeof CLOSE;
  payload?: Omit<ConfirmDialogState, "open">;
};

export const initialConfirmDialogState: ConfirmDialogState = {
  open: false,
  title: "",
  content: "",
  cancelLabel: "Cancel",
  confirmLabel: "Confirm",
  onCancel: undefined,
  onConfirm: undefined,
  onClose: undefined,
  danger: true,
  includeLogo: false,
};

export const confirmDialogReducer = (
  state: ConfirmDialogState = initialConfirmDialogState,
  action: ConfirmDialogAction
): ConfirmDialogState => {
  switch (action.type) {
    case OPEN: {
      return {
        ...state,
        ...action.payload,
        open: true,
      };
    }

    case CLOSE: {
      return initialConfirmDialogState;
    }

    default: {
      return state;
    }
  }
};
