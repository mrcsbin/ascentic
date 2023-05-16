import axios from "axios";

// 주문 요청
export const requestOrder = async (accessToken, requestData, products) => {
  try {
    const response = await axios.post("/finishorder", requestData, {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });
    const orderNum = response.data;

    const orderProd = products.map((item) => ({
      orderId: orderNum,
      optionNum: item.option,
      prodCount: item.count,
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
