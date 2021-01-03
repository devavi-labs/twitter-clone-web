import { ClickAwayListener, Fade, Popper } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import Picker, { IEmojiPickerProps } from "emoji-picker-react";
import React from "react";
import "../styles/emojiPicker/basic.css";

interface EmojiPickerPoppperProps {
  open?: boolean;
  onClose: () => any;
  anchorEl: null | HTMLElement;
}

export const EmojiPickerPopper: React.FC<
  EmojiPickerPoppperProps & IEmojiPickerProps
> = ({ open = false, onClose, anchorEl, ...props }) => {
  const {
    palette: { type },
  } = useTheme();
  if (type === "dark") {
    require("../styles/emojiPicker/dark.css");
  } else {
    require("../styles/emojiPicker/light.css");
  }
  const id = open ? "transitions-popper" : undefined;

  return (
    <Popper
      id={id}
      open={open}
      placement="bottom"
      anchorEl={anchorEl}
      transition
    >
      {({ TransitionProps }) => (
        <ClickAwayListener onClickAway={onClose}>
          <Fade {...TransitionProps} timeout={350}>
            <Picker {...props} />
          </Fade>
        </ClickAwayListener>
      )}
    </Popper>
  );
};
