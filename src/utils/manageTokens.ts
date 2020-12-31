import { decode } from "jsonwebtoken";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants";

export const saveTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem(ACCESS_TOKEN, accessToken);
  localStorage.setItem(REFRESH_TOKEN, refreshToken);
  return true;
};

export const getTokens = () => ({
  accessToken: localStorage.getItem(ACCESS_TOKEN),
  refreshToken: localStorage.getItem(REFRESH_TOKEN),
});

export const validateToken = (token: string) => {
  const payload = decode(token, { json: true });

  if (!payload) {
    return false;
  }

  const { exp } = payload;

  if (Date.now() >= exp * 1000) {
    return false;
  }

  return true;
};
