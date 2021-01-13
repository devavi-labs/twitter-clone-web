import copyToClipboard from "clipboard-copy";

export const useClipboard = () => {
  const copy = async (text: string) => {
    try {
      await copyToClipboard(text);
      return true;
    } catch (_) {
      return false;
    }
  };

  return copy;
};
