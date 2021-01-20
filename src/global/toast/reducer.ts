import { ToastState, OPEN, CLOSE } from ".";

export type ToastAction = {
  type: typeof OPEN | typeof CLOSE;
  payload?: Omit<ToastState, "open">;
};

export const initialToastState: ToastState = {
  open: false,
  message: "",
  onClose: undefined,
};

export const toastReducer = (
  state: ToastState = initialToastState,
  action: ToastAction
): ToastState => {
  switch (action.type) {
    case OPEN: {
      return {
        ...state,
        ...action.payload,
        open: true,
      };
    }

    case CLOSE: {
      return initialToastState;
    }

    default: {
      return state;
    }
  }
};
