import { useState } from "react";

export const useModal = (initiallyOpen: boolean = false) => {
  console.log(initiallyOpen);
  const [open, setOpen] = useState(initiallyOpen);

  const toggle = () => {
    setOpen((open) => !open);
  };

  const onClose = () => {
    setOpen(false);
  };

  return { open, setOpen, toggle, onClose };
};
