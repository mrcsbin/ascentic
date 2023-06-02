import axios from "axios";

const REVIEW_API_URL = "http://localhost:8080/review";

export const setReviewCount = async (accessToken, reviewNum) => {
  await axios.post(`${REVIEW_API_URL}/count/set`, reviewNum, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
};

export const getReviewList = async (accessToken) => {
  const response = await axios.get(`${REVIEW_API_URL}/get`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};
