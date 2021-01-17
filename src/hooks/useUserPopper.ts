import React from "react";
import { UserPopperContext } from "../context/userPopper";
import { RegularQuackFragment } from "../generated/graphql";

export const useUserPopper = (quack: RegularQuackFragment) => {
  const { setOpen, setUser, setAnchorEl } = React.useContext(
    UserPopperContext
  )!;

  let timeout: NodeJS.Timeout | undefined;

  const handlePopperOpen = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    setAnchorEl(event.currentTarget);
    setUser(quack?.quackedByUser!);
    timeout = setTimeout(() => {
      setOpen(true);
    }, 5000);
  };

  const handleMouseOut = () => {
    timeout && clearTimeout(timeout);
  };

  return {
    handlePopperOpen,
    handleMouseOut,
  };
};
