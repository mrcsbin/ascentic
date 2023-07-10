import axios from "axios";

const ORDER_PRODUCT_API_URL = "http://localhost:8080/orderproduct";

export const getOrderProductList = async (accessToken) => {
  const response = await axios.get(`${ORDER_PRODUCT_API_URL}/get/product`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

export const getOrderReviewList = async (accessToken) => {
  const response = await axios.get(`${ORDER_PRODUCT_API_URL}/get/review`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};
