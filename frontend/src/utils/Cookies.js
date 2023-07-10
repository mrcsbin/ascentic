import Cookies from "js-cookie";

export const setCookie = (name, value, option) => {
  Cookies.set(name, value, option);
};

export const getCookie = (name) => {
  return Cookies.get(name);
};

export const removeCookie = (name) => {
  Cookies.remove(name);
};
