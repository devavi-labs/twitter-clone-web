import { useState, MouseEvent } from "react";

export const usePopper = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setOpen((open) => !open);
    setAnchorEl(event.currentTarget);
  };

  const onClose = () => {
    setOpen(false);
    setAnchorEl(null);
  };

  return { anchorEl, setAnchorEl, open, setOpen, handleClick, onClose };
};
