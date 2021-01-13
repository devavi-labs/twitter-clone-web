import { createContext, FC, useState } from "react";

type ToastContextType = {
  open: boolean;
  handleOpen: (message: string) => void;
  onClose: () => void;
  message: string;
};

export const ToastContext = createContext<ToastContextType | null>(null);

export const ToastContextProvider: FC = ({ children }) => {
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  const handleOpen = (message: string) => {
    setMessage(message);
    setOpen(true);
  };
  const onClose = () => setOpen(false);
  return (
    <ToastContext.Provider value={{ open, handleOpen, onClose, message }}>
      {children}
    </ToastContext.Provider>
  );
};
