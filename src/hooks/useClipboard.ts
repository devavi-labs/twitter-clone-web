import copyToClipboard from "clipboard-copy";
import { useToast } from ".";

export const useClipboard = () => {
  const [, { handleOpen: handleToastOpen }] = useToast();

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
