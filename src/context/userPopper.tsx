import { createContext, useState, FC } from "react";
import { RegularUserFragment, ShortUserFragment } from "../generated/graphql";
import { usePopper } from "../hooks/usePopper";

export interface UserPopperContextType {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  anchorEl: HTMLElement | null;
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  onClose: () => void;
  user: RegularUserFragment | ShortUserFragment | null;
  setUser: React.Dispatch<
    React.SetStateAction<RegularUserFragment | ShortUserFragment | null>
  >;
}

export const UserPopperContext = createContext<UserPopperContextType | null>(
  null
);

export const UserPopperContextProvider: FC = ({ children }) => {
  const { open, setOpen, onClose } = usePopper();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [user, setUser] = useState<
    RegularUserFragment | ShortUserFragment | null
  >(null);

  return (
    <UserPopperContext.Provider
      value={{
        open,
        setOpen,
        anchorEl,
        setAnchorEl,
        onClose,
        user,
        setUser,
      }}
    >
      {children}
    </UserPopperContext.Provider>
  );
};