import { useState } from "react";

export const useDisclosure = (initiallyOpen: boolean = false) => {
  const [open, setOpen] = useState(initiallyOpen);

  const toggle = () => {
    setOpen((open) => !open);
  };

  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return { open, setOpen, toggle, onOpen, onClose };
};
