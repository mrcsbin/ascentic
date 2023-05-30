import axios from "axios";
import { useEffect, useState, useNavigate } from "react";

const ORDER_API_URL = "http://localhost:8080";

// 주문 요청
export const requestOrder = async (accessToken, requestData, products) => {
  try {
    await axios
      .post("/finishorder", requestData, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })

      // 토스페이먼츠
      .then(async (res) => {
        const data = res.data;
        const clientKey = "test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq";
        const tossPayments = window.TossPayments(clientKey);

        tossPayments
          .requestPayment("card", {
            orderId: data.orderId,
            orderName: data.orderName,
            customerName: data.customerName,
            amount: data.amount,
            customerEmail: data.order_email,
            successUrl: data.successUrl,
            failUrl: data.failUrl,
          })

          .then((res) => {
            console.log(res.data);
          });

        // ProdOrder 생성하기
        const orderProd = products.map((item, index) => ({
          orderId: data.orderId,
          orderNum: data.orderNum,
          optionNum: item.prodOptionNum,
          prodCount: item.prodCount,
          orderState: "결제대기중",
        }));

        // // 여러개의 요청을 동시에 (각각의 상품들을)
        await Promise.all(
          orderProd.map((prod) =>
            axios
              .post("/finishorderprod", prod, {
                headers: {
                  Authorization: "Bearer " + accessToken,
                },
              })
              .then((res) => res.data)
          )
        );
      });
  } catch (e) {
    if (e.code === "USER_CANCEL") {
      alert("사용자가 결제를 취소하였습니다!");
    }
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
