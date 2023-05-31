import axios from "axios";

const CART_API_URL = "http://localhost:8080/cart";

export const getCartList = async (accessToken) => {
  const response = await axios.get(`${CART_API_URL}/get`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

export const addCart = async (accessToken, cartData) => {
  await axios.post(`${CART_API_URL}/add`, cartData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const removeCart = async (accessToken, cartNum) => {
  await axios.delete(`${CART_API_URL}/del/${cartNum}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const updateCart = async (cartNum, productCount) => {
  await axios.post(`${CART_API_URL}/update`, {
    cartNum,
    productCount,
  });
};
