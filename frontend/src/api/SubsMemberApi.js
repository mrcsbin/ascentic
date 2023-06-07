import axios from "axios";

export const requestApplySubs = async (accessToken, requestData) => {
  try {
    console.log(accessToken);
    console.log(requestData);
    await axios.post("/startSubscribe", requestData, {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });
  } catch (error) {
    // alert("구독 가입 실패");
    console.error(error);
  }
};

export const requestTasteRes = async (accessToken) => {
  try {
    const response = await axios.get("/getTaste", {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const isSubscribeMember = async (accessToken) => {
  const response = await axios.get("http://localhost:8080/subscribe/member", {
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  });

  return response.data;
};

export const isSubscribUseMonth = async (accessToken) => {
  const response = await axios.get("http://localhost:8080/subscribe/usemonth", {
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  });

  return response.data;
};
