import { createContext } from "react";

export type FeedState = {
  feed?: "home" | "profile";
  username?: string;
  tab?: number;
};

interface FeedContextType {
  state?: FeedState | null;
  setState: React.Dispatch<React.SetStateAction<FeedState | null>>;
}

export const FeedContext = createContext<FeedContextType | null>(null);
