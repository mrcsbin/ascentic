import axios from "axios";

const CART_API_URL = "http://localhost:8080/cart";

export const getCartItemList = async (accessToken) => {
  const response = await axios.get(`${CART_API_URL}/get`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

export const addCart = async (accessToken) => {
  const response = await axios.post(`${CART_API_URL}/add`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

export const removeCart = async (cartNum, accessToken) => {
  const response = await axios.delete(`${CART_API_URL}/del/${cartNum}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

export const updateCart = async (cartNum, prodCount) => {
  const response = await axios.post(`${CART_API_URL}/update`, {
    cartNum,
    prodCount,
  });
  return response.data;
};
