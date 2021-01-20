import { useReducer } from "react";
import {
  ConfirmDialogContext,
  initialConfirmDialogState,
  confirmDialogReducer,
} from ".";

export const ConfirmDialogProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(
    confirmDialogReducer,
    initialConfirmDialogState
  );
  return (
    <ConfirmDialogContext.Provider value={{ state, dispatch }}>
      {children}
    </ConfirmDialogContext.Provider>
  );
};
