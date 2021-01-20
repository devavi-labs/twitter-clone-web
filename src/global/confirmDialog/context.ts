import { createContext } from "react";
import { ContextType } from "..";
import { ConfirmDialogAction, initialConfirmDialogState } from ".";

export type ConfirmDialogState = {
  title: string;
  content: string;
  open: boolean;
  onClose?: () => any;
  cancelLabel?: string;
  confirmLabel?: string;
  onCancel?: () => any;
  onConfirm?: () => any;
  danger?: boolean;
  includeLogo?: boolean;
};

export type ConfirmDialogContextType = ContextType<
  ConfirmDialogState,
  ConfirmDialogAction
>;

export const ConfirmDialogContext = createContext<ConfirmDialogContextType>({
  state: initialConfirmDialogState,
  dispatch: () => null,
});
