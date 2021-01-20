import { createContext } from "react";
import { ContextType } from "..";
import { initialToastState, ToastAction } from ".";

export type ToastState = {
  open: boolean;
  onClose: (() => void) | undefined;
  message: string;
};

export type ToastContextType = ContextType<ToastState, ToastAction>;

export const ToastContext = createContext<ToastContextType>({
  state: initialToastState,
  dispatch: () => null,
});
