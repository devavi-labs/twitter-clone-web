import { ClickAwayListener, Fade, Popper } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Picker, PickerProps } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";

import React from "react";
import "../styles/emojiPicker/basic.css";
import "../styles/emojiPicker/light.css";
import "../styles/emojiPicker/dark.css";

interface EmojiPickerPoppperProps {
  open?: boolean;
  onClose: () => any;
  anchorEl: null | HTMLElement;
}

export const EmojiPickerPopper: React.FC<
  EmojiPickerPoppperProps & Pick<PickerProps, "onSelect">
> = ({ open = false, onClose, anchorEl, ...props }) => {
  const {
    palette: { type },
  } = useTheme();

  const useStyles = makeStyles(() => ({
    root: {
      bottom: "100% !important",
      zIndex: 999999,
    },
  }));

  const classes = useStyles();

  const id = open ? "transitions-popper" : undefined;

  const customIcons = {
    categories: {
      search: () => <></>,
      recent: () => <></>,
      smileys: () => <></>,
      people: () => <></>,
      nature: () => <></>,
      foods: () => <></>,
      activity: () => <></>,
      places: () => <></>,
      objects: () => <></>,
      symbols: () => <></>,
      flags: () => <></>,
      custom: () => <></>,
    },
  };

  const PickerWithRef = React.forwardRef<any>((p, ref) => (
    <div {...p} ref={ref}>
      <Picker
        {...props}
        set="twitter"
        sheetSize={16}
        perLine={8}
        emojiSize={20}
        showPreview={false}
        theme={type}
        icons={customIcons as any}
      />
      ;
    </div>
  ));

  return (
    <Popper
      id={id}
      open={open}
      placement="bottom"
      anchorEl={anchorEl}
      transition
      className={classes.root}
    >
      {({ TransitionProps }) => (
        <ClickAwayListener onClickAway={onClose}>
          <Fade {...TransitionProps} timeout={350}>
            <PickerWithRef />
          </Fade>
        </ClickAwayListener>
      )}
    </Popper>
  );
};
