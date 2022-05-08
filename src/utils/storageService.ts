export const enum Locals {
  ACCESS_TOKEN = "access_token",
  USER = "user",
  AUTHORIZATIONS = "authorizations",
  REFRESH_TOKEN = "refresh_token",
}

const setObject = (key: string, data: any) => {
  if (typeof window === "undefined") return null;
  localStorage.setItem(key, JSON.stringify(data));
};

const getObject = (key: string): any => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(key) || JSON.parse(localStorage.getItem(key));
};

const setItem = (key: string, data: any) => {
  if (typeof window === "undefined") return null;
  localStorage.setItem(key, data.toString());
};

const getItem = (key: string): any => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(key);
};

const removeItem = (key: string) => {
  if (typeof window === "undefined") return null;
  localStorage.removeItem(key);
};

export default { setObject, getObject, setItem, getItem, removeItem };
