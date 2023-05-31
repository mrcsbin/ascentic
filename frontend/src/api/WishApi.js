import axios from "axios";

const Wish_API_URL = "http://localhost:8080/wish";

export const setWish = async (accessToken, productNum) => {
  await axios.post(`${Wish_API_URL}/set`, productNum, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
};

export const getWishList = async (accessToken) => {
  const response = await axios.get(`${Wish_API_URL}/get`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  console.log(response.data);
  return response;
};
