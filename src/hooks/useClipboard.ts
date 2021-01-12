import copyToClipboard from "clipboard-copy";
import { useState } from "react";

export const useClipboard = (
  timeout: number = 3000
): [(text: string) => Promise<void>, boolean] => {
  const [copied, setCopied] = useState(false);

  const copy = async (text: string) => {
    try {
      await copyToClipboard(text);
      setCopied(true);
      setTimeout(() => setCopied(false), timeout);
    } catch (_) {
      setCopied(false);
    }
  };

  return [copy, copied];
};
