import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPayMethod } from "../../store/modules/order";
import styled from "styled-components";

// 결제 수단
const Payment = () => {
  const dispatch = useDispatch(); // action 객체를 보내는 훅
  const payMethod = useSelector((state) => state.order.payMethod);

  const handleSetPayMethod = (type) => {
    dispatch(setPayMethod({ type }));
  };

  const buttons = [
    { type: "kakao", text: "카카오페이" },
    { type: "naver", text: "네이버페이" },
    { type: "card", text: "신용카드" },
    { type: "deposit", text: "무통장 입금" },
    { type: "account", text: "실시간 계좌이체" },
  ];
  return (
    <PaymentMethod>
      <div>
        {buttons.map((button) => (
          <button
            key={button.type}
            onClick={() => handleSetPayMethod(button.type)}
            disabled={payMethod[button.type]}
            style={{
              backgroundColor: payMethod[button.type] ? "black" : "",
              color: payMethod[button.type] ? "white" : "",
            }}
          >
            {button.text}
          </button>
        ))}
      </div>
      <div>
        고객님의 안전한 현금자산 거래를 위하여 하나은행과
        <br />
        <br />
        채무지급보증계약을 체결하여 보장해드리고 있습니다.
        <br />
        <br />
        <a href="/">서비스 가입사실 확인</a>
      </div>
    </PaymentMethod>
  );
};

export default Payment;

const PaymentMethod = styled.div`
  margin-top: 30px;
  margin-left: 60px;
  width: 609px;
  height: 450px;
  background-color: white;

  > div > button {
    margin-top: 7px;
    margin-left: 50px;
    background-color: white;
    width: 515px;
    height: 50px;
    font-size: 18px;
  }

  > :nth-child(2) {
    margin-top: 30px;
    margin-left: 50px;
    text-align: center;
    color: black;
  }
`;
