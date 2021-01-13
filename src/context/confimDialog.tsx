import { createContext, FC, useState } from "react";
import { ConfirmDialogProps } from "../components/ConfirmDialog";

type ConfirmDialogOpenProps = Omit<ConfirmDialogProps, "open" | "onClose">;

type ConfirmDialogContextType = ConfirmDialogProps & {
  handleOpen: (props: ConfirmDialogOpenProps) => void;
};

export const ConfirmDialogContext = createContext<ConfirmDialogContextType | null>(
  null
);

export const ConfirmDialogContextProvider: FC = ({ children }) => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [cancelLabel, setCancelLabel] = useState<string | undefined>();
  const [confirmLabel, setConfirmLabel] = useState<string | undefined>();
  const [open, setOpen] = useState(false);
  const [danger, setDanger] = useState(false);
  const [includeLogo, setIncludeLogo] = useState(false);

  const onClose = () => setOpen(false);

  const [onCancel, setOnCancel] = useState<() => void>(onClose);
  const [onConfirm, setOnConfirm] = useState<() => void>(onClose);

  const handleOpen = ({
    title,
    content,
    cancelLabel,
    confirmLabel,
    onCancel,
    onConfirm,
    danger,
    includeLogo,
  }: ConfirmDialogOpenProps) => {
    setTitle(title);
    setContent(content);
    cancelLabel ? setCancelLabel(cancelLabel) : setCancelLabel(undefined);
    confirmLabel ? setConfirmLabel(confirmLabel) : setConfirmLabel(undefined);
    onCancel ? setOnCancel(() => onCancel) : setOnCancel(() => onClose);
    onConfirm ? setOnConfirm(() => onConfirm) : setOnConfirm(() => onClose);
    danger !== undefined ? setDanger(danger) : setDanger(true);
    includeLogo !== undefined
      ? setIncludeLogo(includeLogo)
      : setIncludeLogo(false);
    setOpen(true);
  };

  return (
    <ConfirmDialogContext.Provider
      value={{
        handleOpen,
        title,
        content,
        cancelLabel,
        confirmLabel,
        onCancel,
        onConfirm,
        danger,
        includeLogo,
        open,
        onClose,
      }}
    >
      {children}
    </ConfirmDialogContext.Provider>
  );
};
