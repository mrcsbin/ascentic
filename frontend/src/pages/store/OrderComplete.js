import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getCookie } from "../../utils/Cookies";
import "../../styles/OrderComplete.css";
import { CardInfo } from "../../constants/card";

function OrderComplete() {
  const [orderInfo, setOrderInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  function formatDateString(dateString) {
    const formattedString = dateString.replace("T", " ").substring(0, 16);
    return formattedString;
  }

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
        const data = res.data;

        if (data.orderId === "0") {
          navigate("/NotFound");
        } else {
          setOrderInfo({
            orderMemberName: data.orderName,
            orderNum: data.orderId,
            date: formatDateString(data.orderDate),
            orderMemberEmail: data.email,
            ShipName: data.shipName,
            shipMainAddr: data.shipMainAddress,
            shipSubAddr: data.shipSubAddress,
            orderMemberPhone: data.shipTel,
            ShippingCharge: data.shipCharge,
            Price: data.orderPriceSum,
            ProdNames: data.prodNames,
            count: data.totalProdCount,
            OrderState: data.card.orderState,
            cardNumber: data.card.number,
            cardIssuerCode: data.card.issuerCode,
            cardType: data.card.cardType,
            cardOwnerType: data.card.ownerType,
            cardInstallmentPlanMonths: data.card.installmentPlanMonths,
            failureCode: data.failure.code,
            failureMessage: data.failure.message,
          });
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log("처음 데이터 못 받아옴");
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
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
                <br />
                {orderInfo.date} 주문하신 주문번호는 {orderInfo.orderNum}{" "}
                입니다.
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
                  주문자: {orderInfo.orderMemberName} (
                  {orderInfo.orderMemberEmail}) <br />
                </td>
                <td>
                  {`${CardInfo[orderInfo.cardIssuerCode]} ${
                    orderInfo.cardType
                  } `}
                  <br />
                  {orderInfo.cardNumber}
                  {/* <br /> */}
                  {/* 신용/체크 : {orderInfo.cardType} */}
                  {/* <br /> */}
                  {/* 개인/법인 : {orderInfo.cardOwnerType} */}
                  <br />
                  {orderInfo.cardInstallmentPlanMonths === 0 ? (
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
                  {orderInfo.ProdNames} <br />총 {orderInfo.count} 개
                  <br />
                  {/* <a href="#">더보기</a> */}
                </td>
                <td>
                  <br />
                  <br />
                  <br />
                  {orderInfo.shipMainAddr}
                  {orderInfo.shipSubAddr}
                  <br />
                  <br />
                  {orderInfo.orderMemberPhone}
                </td>
                <td>
                  <br />
                  <br />
                  <div>{orderInfo.paymentMethod}</div>
                  <br />
                  <div>{orderInfo.Price + orderInfo.ShippingCharge}원</div>
                  <div>
                    <div>
                      <div>주문 금액</div>
                      <div>{orderInfo.Price} 원</div>
                    </div>
                    <div>
                      <div>배송비</div>
                      <div>+{orderInfo.ShippingCharge} 원</div>
                    </div>
                    <div>
                      <div>총 결제 금액</div>
                      <div>
                        +{orderInfo.Price + orderInfo.ShippingCharge} 원
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderComplete;
