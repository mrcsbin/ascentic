import React, { useState } from "react";
import "../../styles/OrderComplete.css";

function OrderComplete() {
  // 구매 정보
  const [orderInfo, setOrderInfo] = useState({
    orderNum: 2023042515012156,
    prdeName: "퍼퓸 밤 디스커버리 세트", // 구매 상품
    Option: "0.5g*4ea", // 옵션
    delivCharge: 2500, // 배송비
    Price: 8000, // 상품 가격
    paymentMethod: "NaverPay", // 결제 수단
    count: 2, // 구매 상품 개수
    date: "2023.04.25", // 구매날짜
    orderMembeName: "홍길동", // 구매자 성함
    orderMemberEmail: "example@naver.com", // 구매자 이메일
    Addr: "서울 특별시 강서구 302-42", // 배송지
    orderMemberPhone: "010-1234-4567", // 구매자 연락처
  });

  return (
    <div>
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
            {orderInfo.prdeName}/ {orderInfo.Option} / 1개 외{" "}
            {orderInfo.count - 1} 건<br />
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
              <span>주문번호: {orderInfo.orderNum}</span>
            </td>
            <td>
              주문자: {orderInfo.orderMembeName} ({orderInfo.orderMemberEmail})
            </td>
            <td></td>
          </tr>
          <tr>
            <td>
              <br />
              <br />
              {orderInfo.prdeName}
              <br />
              <br />
              <br />
              <br />
              {orderInfo.Option} / 1개 외 {orderInfo.count - 1} 건<br />
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
