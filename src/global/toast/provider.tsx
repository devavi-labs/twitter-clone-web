import { useReducer } from "react";
import { ToastContext, initialToastState, toastReducer } from ".";

export const ToastProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(toastReducer, initialToastState);
  return (
    <ToastContext.Provider value={{ state, dispatch }}>
      {children}
    </ToastContext.Provider>
  );
};
