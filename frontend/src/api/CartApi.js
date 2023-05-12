import axios from "axios";

const CART_API_URL = "http://localhost:8080/cart";

export const getCartItemList = async (accessToken) => {
  const response = await axios.get(`${CART_API_URL}/getv2`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

export const addCart = async (accessToken) => {
  const response = await axios.post(`${CART_API_URL}/addv2`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

export const removeCart = async (cartNum, accessToken) => {
  const response = await axios.delete(`${CART_API_URL}/delv2/${cartNum}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};
