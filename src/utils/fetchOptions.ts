import { ACCESS_TOKEN } from "./constants";

export const createFetchOptions = () => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  return {
    credentials: "include" as const,
    headers: { Authorization: `Bearer ${accessToken}` },
  };
};
