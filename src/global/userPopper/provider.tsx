import { useReducer } from "react";
import {
  UserPopperContext,
  initialUserPopperState,
  userPopperReducer,
} from ".";

export const UserPopperProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(
    userPopperReducer,
    initialUserPopperState
  );
  return (
    <UserPopperContext.Provider value={{ state, dispatch }}>
      {children}
    </UserPopperContext.Provider>
  );
};
