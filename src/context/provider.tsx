import React from "react";
import { useLocalTheme } from "../hooks/useLocalTheme";
import { ThemeContext } from "./theme";
import { UserPopperContextProvider } from "./userPopper";
import { ToastContextProvider } from "./toast";
import { ConfirmDialogContextProvider } from "./confimDialog";
import { DrawerContextProvider } from "./drawer";

export const ContextProvider: React.FC = ({ children }) => {
  const { theme, toggleTheme } = useLocalTheme();

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <UserPopperContextProvider>
        <ConfirmDialogContextProvider>
          <DrawerContextProvider>
            <ToastContextProvider>{children}</ToastContextProvider>
          </DrawerContextProvider>
        </ConfirmDialogContextProvider>
      </UserPopperContextProvider>
    </ThemeContext.Provider>
  );
};
