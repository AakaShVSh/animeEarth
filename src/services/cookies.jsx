import Cookies from "js-cookie";

// Only used to read the public isLoggedIn flag
// All cookies are set/cleared by the backend now
export const getCookies = (key) => {
  const value = Cookies.get(key);
  if (value === undefined) return null;
  return value;
};
