import axios from "axios";

const SUBSCRIBE_SEND_API_URL = "http://localhost:8080";

export const getMyPageProfileSubscribe = async (accessToken) => {
  const response = await axios.get(
    `${SUBSCRIBE_SEND_API_URL}/subscribe/mypage/profile`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response.data;
};

export const getMemberSubscribe = async (accessToken) => {
  const response = await axios.get(
    `${SUBSCRIBE_SEND_API_URL}/subscribe/mypage`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response.data;
};
