import { createContext } from "react";
import { initialUserPopperState, UserPopperAction } from ".";
import { ContextType } from "..";
import { RegularUserFragment } from "../../generated/graphql";

export type UserPopperState = {
  open: boolean;
  anchorEl: HTMLElement | null | undefined;
  onClose: (() => void) | null | undefined;
  user: RegularUserFragment | null | undefined;
};

export type UserPopperContextType = ContextType<
  UserPopperState,
  UserPopperAction
>;

export const UserPopperContext = createContext<UserPopperContextType>({
  state: initialUserPopperState,
  dispatch: () => null,
});
