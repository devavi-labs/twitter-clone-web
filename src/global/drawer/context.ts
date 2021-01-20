import { createContext } from "react";
import { ContextType } from "..";
import { DrawerAction, initialDrawerState } from ".";

export type DrawerState = {
  open: boolean;
  onClose: (() => void) | undefined;
};

export type DrawerContextType = ContextType<DrawerState, DrawerAction>;

export const DrawerContext = createContext<DrawerContextType>({
  state: initialDrawerState,
  dispatch: () => null,
});
