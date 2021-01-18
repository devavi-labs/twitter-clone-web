import { createContext, FC } from "react";
import { useDisclosure } from "../hooks/useDisclosure";

type DrawerContextType = {
  open: boolean;
  toggle: () => void;
  onClose: () => void;
};

export const DrawerContext = createContext<DrawerContextType | null>(null);

export const DrawerContextProvider: FC = ({ children }) => {
  const { open, toggle, onClose } = useDisclosure();

  return (
    <DrawerContext.Provider value={{ open, toggle, onClose }}>
      {children}
    </DrawerContext.Provider>
  );
};
