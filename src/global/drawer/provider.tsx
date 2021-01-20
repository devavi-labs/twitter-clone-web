import { useReducer } from "react";
import { DrawerContext, drawerReducer, initialDrawerState } from ".";

export const DrawerProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(drawerReducer, initialDrawerState);

  return (
    <DrawerContext.Provider value={{ state, dispatch }}>
      {children}
    </DrawerContext.Provider>
  );
};
