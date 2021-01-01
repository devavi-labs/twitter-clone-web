import { useState } from "react";

export const useModal = () => {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen((open) => !open);
  };

  const onClose = () => {
    setOpen(false);
  };

  return { open, setOpen, toggle, onClose };
};
