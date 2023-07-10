import axios from "axios";

const PRODUCT_API_URL = "http://localhost:8080/product";

export const getRecommendList = async (prodNum, scentNoteName) => {
  const response = await axios.get(
    `${PRODUCT_API_URL}/recommend/${prodNum}?scentNoteName=${scentNoteName}`
  );
  return response.data;
};
