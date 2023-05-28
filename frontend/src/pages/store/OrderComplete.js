import React, { useState, useEffect } from "react";
import axios from "axios";
import { getCookie } from "../../utils/Cookies";
import "../../styles/OrderComplete.css";
import { CardInfo } from "../../constants/card";
function OrderComplete() {
  const [orderInfo, setOrderInfo] = useState({});
  const formatting = (parsed) => {
    return `${parsed.getFullYear()}-${(parsed.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${parsed
      .getDate()
      .toString()
      .padStart(2, "0")} ${parsed
      .getHours()
      .toString()
      .padStart(2, "0")}:${parsed.getMinutes().toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get("orderId");

    axios
      .get("/orderCompleteInfo", {
        params: {
          orderId: orderId,
        },
        headers: {
          Authorization: "Bearer " + getCookie("accessToken"),
        },
      })
      .then((res) => {
        console.log(res.data);

        const data = res.data;
        console.log(data.card.installmentPlanMonths);
        const dateForParse = new Date(data.orderDate);
        setOrderInfo({
          orderMembeName: data.orderName,
          orderNum: data.orderId,
          date: formatting(dateForParse),
          orderMemberEmail: data.email,
          ShipName: data.shipName,
          Addr: data.shipAddress,
          orderMemberPhone: data.shipTel,
          delivCharge: data.shipCharge,
          Price: data.orderPriceSum,
          ProdNames: data.prodNames,
          count: data.totalProdCount,
          OrderState: data.card.orderState,
          cardNumber: data.card.number,
          cardIssuerCode: data.card.issuerCode,
          cardType: data.card.cardType,
          cardOwnerType: data.card.ownerType,
          cardinstallmentPlanMonths: data.card.installmentPlanMonths,
          failureCode: data.failure.code,
          failureMessage: data.failure.message,
        });
      })
      .catch((error) => {
        console.log("처음 데이터 못 받아옴");
        console.log(error);
      });
  }, []);

  // 구매 정보
  // const [orderInfo, setOrderInfo] = useState({
  //   orderNum: orderId,
  //   prdeName: "퍼퓸 밤 디스커버리 세트", // 구매 상품
  //   delivCharge: 2500, // 배송비
  //   Price: 8000, // 상품 가격
  //   paymentMethod: "NaverPay", // 결제 수단
  //   count: 2, // 구매 상품 개수
  //   date: "2023.04.25", // 구매날짜
  //   orderMembeName: "홍길동", // 구매자 성함
  //   orderMemberEmail: "example@naver.com", // 구매자 이메일
  //   Addr: "서울 특별시 강서구 302-42", // 배송지
  //   orderMemberPhone: "010-1234-4567", // 구매자 연락처
  // });

  return (
    <div className="order_complete_wrap">
      <div className="title">주문 / 결제</div>
      <div className="complete_body">
        <div className="complete_message">
          <div>
            주문이 완료되었습니다.
            <br />
            <br />
            감사합니다.
          </div>
          <div>
            {orderInfo.ProdNames}
            <br />
            {orderInfo.date} 주문하신 주문번호는 {orderInfo.orderNum} 입니다.
          </div>
        </div>
        <table>
          <tr>
            <td>상품 정보</td>
            <td>배송지 정보</td>
            <td>결제 정보</td>
          </tr>
          <tr>
            <td>
              <span>주문일자: {orderInfo.date}</span>
              <br />
              <span>주문번호: {orderInfo.orderNum}</span>
            </td>
            <td>
              주문자: {orderInfo.orderMembeName} ({orderInfo.orderMemberEmail}){" "}
              <br />
            </td>
            <td>
              카드사 : {CardInfo[orderInfo.cardIssuerCode]}
              <br />
              카드번호 : {orderInfo.cardNumber}
              <br />
              신용/체크 : {orderInfo.cardType}
              <br />
              개인/법인 : {orderInfo.cardOwnerType}
              <br />
              {console.log(orderInfo.cardInstallmentPlanMonths)}
              {orderInfo.cardInstallmentPlanMonths == undefined ? (
                <span>일시불</span>
              ) : (
                <span>{orderInfo.cardInstallmentPlanMonths}개월</span>
              )}
            </td>
          </tr>
          <tr>
            <td>
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              {orderInfo.ProdNames} <br />총 {orderInfo.count} 개
              <br />
              <a href="#">더보기</a>
            </td>
            <td>
              <br />
              <br />
              {orderInfo.orderMembeName}
              <br />
              <br />
              {orderInfo.Addr}
              <br />
              <br />
              {orderInfo.orderMemberPhone}
            </td>
            <td>
              <br />
              <br />
              <div>{orderInfo.paymentMethod}</div>
              <br />
              <div>{orderInfo.Price + orderInfo.delivCharge}원</div>
              <div>
                <div>
                  <div>주문 금액</div>
                  <div>{orderInfo.Price} 원</div>
                </div>
                <div>
                  <div>배송비</div>
                  <div>+{orderInfo.delivCharge} 원</div>
                </div>
                <div>
                  <div>총 결제 금액</div>
                  <div>+{orderInfo.Price + orderInfo.delivCharge} 원</div>
                </div>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
}

export default OrderComplete;
