import React, { useState } from "react";
import { useLocalTheme } from "../hooks/useLocalTheme";
import { FeedContext, FeedState } from "./feed";
import { ThemeContext } from "./theme";
import { UserPopperContextProvider } from "./userPopper";
import { ToastContextProvider } from "./toast";
import { ConfirmDialogContextProvider } from "./confimDialog";

export const ContextProvider: React.FC = ({ children }) => {
  const { theme, toggleTheme } = useLocalTheme();
  const [feedState, setFeedState] = useState<FeedState | null>(null);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <FeedContext.Provider
        value={{ state: feedState, setState: setFeedState }}
      >
        <UserPopperContextProvider>
          <ConfirmDialogContextProvider>
            <ToastContextProvider>{children}</ToastContextProvider>
          </ConfirmDialogContextProvider>
        </UserPopperContextProvider>
      </FeedContext.Provider>
    </ThemeContext.Provider>
  );
};
