import axios from "axios";

const MEMBER_API_URL = "http://localhost:8080/cart";

export const getUserCart = async (accessToken) => {
  const response = await axios.get(`${MEMBER_API_URL}/test`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};