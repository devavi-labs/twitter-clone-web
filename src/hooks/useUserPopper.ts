import React from "react";
import { RegularUserFragment } from "../generated/graphql";
import { UserPopperContext, UserPopperState } from "../global";

export const useUserPopper = (): [
  UserPopperState,
  {
    handlePopperOpen: (
      event: React.MouseEvent<HTMLElement, MouseEvent>,
      user: RegularUserFragment,
      onClose?: (() => void) | undefined
    ) => void;
    handlePopperClose: () => void;
    handleMouseOut: () => void;
  }
] => {
  const { state, dispatch } = React.useContext(UserPopperContext);

  let timeout: NodeJS.Timeout | undefined;

  const handlePopperOpen = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    user: RegularUserFragment,
    onClose?: () => void
  ) => {
    timeout = setTimeout(() => {
      dispatch({
        type: "OPEN",
        payload: {
          user,
          anchorEl: event.currentTarget,
          onClose: onClose || handlePopperClose,
        },
      });
    }, 5000);
  };

  const handlePopperClose = () => dispatch({ type: "CLOSE" });

  const handleMouseOut = () => {
    timeout && clearTimeout(timeout);
  };

  return [
    state,
    {
      handlePopperOpen,
      handlePopperClose,
      handleMouseOut,
    },
  ];
};
