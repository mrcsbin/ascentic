import axios from "axios";

const ORDER_API_URL = "http://localhost:8080";

// 주문 요청
export const requestOrder = async (accessToken, requestData, products) => {
  // console.log(`requestData = ${requestData}`);
  // var forPayment = [...requestData, products[0].prodName];
  // console.log(`forPayment = ${forPayment}`);

  try {
    const response = await axios.post("/finishorder", requestData, {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });
    const orderNum = response.data;

    const orderProd = products.map((item) => ({
      orderId: orderNum,
      optionNum: item.prodOptionNum,
      prodCount: item.prodCount,
      orderState: false,
    }));

    // 여러개의 요청을 동시에
    await Promise.all(
      orderProd.map((prod) =>
        axios.post("/finishorderprod", prod).then((res) => res.data)
      )
    );

    return orderNum;
  } catch (error) {
    console.error(error);
  }
};

export const requestRecentAddr = async (accessToken) => {
  try {
    const response = await axios.get("/recentaddr", {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getMemberInfo = async (accessToken) => {
  const response = await axios.get(`${ORDER_API_URL}/order/getuser`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

export const getProductInfo = async (cartNum) => {
  const queryParam = cartNum.map((cartNum) => `cartNum=${cartNum}`).join("&");
  const response = await axios.get(`${ORDER_API_URL}/order?${queryParam}`);

  return response.data;
};
