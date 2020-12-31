import { decode } from "jsonwebtoken";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants";

export const saveTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem(ACCESS_TOKEN, accessToken);
  localStorage.setItem(REFRESH_TOKEN, refreshToken);
  return true;
};

export const getTokens = () => ({
  accessToken: _getToken(ACCESS_TOKEN),
  refreshToken: _getToken(REFRESH_TOKEN),
});

export const removeTokens = () => {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
  return true;
};

const _getToken = (key: typeof ACCESS_TOKEN | typeof REFRESH_TOKEN) => {
  const _token = localStorage.getItem(key);
  if (!_token) return null;
  if (!_validateToken(_token)) {
    localStorage.removeItem(key);
    return null;
  }
  return _token;
};

const _validateToken = (token: string) => {
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
