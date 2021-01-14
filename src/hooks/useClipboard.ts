import copyToClipboard from "clipboard-copy";
import { useContext } from "react";
import { ToastContext } from "../context/toast";

export const useClipboard = () => {
  const { handleOpen: handleToastOpen } = useContext(ToastContext)!;

  const copy = async (text: string) => {
    try {
      await copyToClipboard(text);
      handleToastOpen("Link copied");
    } catch (_) {
      handleToastOpen("Link couldn't be copied");
    }
  };

  return copy;
};
