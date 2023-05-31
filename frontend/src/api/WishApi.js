import axios from "axios";

const Wish_API_URL = "http://localhost:8080/wish";

export const setWish = async (accessToken, prodNum) => {
  await axios.get(`${Wish_API_URL}/set?prodNum=${prodNum}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const getWishList = async (accessToken) => {
  const response = await axios.get(`${Wish_API_URL}/get`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  console.log(response.data)
  return response;
};
