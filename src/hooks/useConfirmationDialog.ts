import { useState } from "react";

export const useConfirmationDialog = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [cancelLabel, setCancelLabel] = useState("");

  const [confirmLabel, setConfirmLabel] = useState("");
  const [confirmAction, setConfirmAction] = useState<() => void>(() => {});

  const handleOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return {
    open,
    handleOpen,
    onClose,
    title,
    setTitle,
    content,
    setContent,
    cancelLabel,
    setCancelLabel,
    confirmLabel,
    setConfirmLabel,
    confirmAction,
    setConfirmAction,
  };
};
