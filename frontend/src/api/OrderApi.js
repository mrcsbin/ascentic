import axios from "axios";

const ORDER_API_URL = "http://localhost:8080";

export const getMemberInfo = async (accessToken) => {
    const response = await axios.get(`${ORDER_API_URL}/order/getuser`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  };