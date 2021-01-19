import {
  Box,
  ClickAwayListener,
  Fade,
  Popper as MuiPopper,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

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

  const useStyles = makeStyles(({ palette: { secondary, type } }) => ({
    root: {
      backgroundColor: secondary.main,
      boxShadow: `0 0 8px 2px ${
        type === "dark" ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)"
      }`,
      borderRadius: "12px",
      minWidth: minWidth,
      display: "flex",
      flexDirection: "column",
      alignItems: "stretch",
      padding: 0,
    },
  }));
  const classes = useStyles();
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
