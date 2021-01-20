import {
  Box,
  ClickAwayListener,
  Fade,
  Popper as MuiPopper,
} from "@material-ui/core";
import React from "react";
import { useStyles } from "./styles";

export interface PopperProps {
  open?: boolean;
  onClose: () => any;
  anchorEl: null | HTMLElement;
  minWidth?: string;
}

export const Popper: React.FC<PopperProps> = ({
  open = false,
  onClose,
  anchorEl,
  minWidth,
  children,
}) => {
  const id = open ? "transitions-popper" : undefined;

  const classes = useStyles({ minWidth });
  return (
    <MuiPopper
      id={id}
      open={open}
      placement="top"
      anchorEl={anchorEl}
      transition
      style={{ zIndex: 1500 }}
    >
      {({ TransitionProps }) => (
        <ClickAwayListener onClickAway={onClose}>
          <Fade {...TransitionProps} timeout={350}>
            <Box className={classes.root}>{children}</Box>
          </Fade>
        </ClickAwayListener>
      )}
    </MuiPopper>
  );
};
