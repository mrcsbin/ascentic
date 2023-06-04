import React, { useState } from "react";

import styled from "styled-components";
import { useSelector } from "react-redux";
import { requestApplySubs } from "../../api/SubsMemberApi";
import { getCookie } from "../../utils/Cookies";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SubsPayInfo = (props) => {
  const [agree, setAgree] = useState(false);

  const now = new Date();
  const accessToken = getCookie("accessToken");

  const getDay = () => {
    return now.getDate();
  };

  const getToday = () => {
    return new Date(now.getTime()).toLocaleDateString();
  };

  const getNextMonthSameDate = () => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const currentDate = now.getDate();

    // 현재월이 12월인 경우
    const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
    const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;

    // 다음달의 마지막 일을 구한다.
    const daysInNextMonth = new Date(nextYear, nextMonth + 1, 0).getDate();

    // 현재날짜보다 다음달의 마지막날짜가 크거나 같으면 현재날짜와 같은 값을 가짐
    // 그렇지 않은 경우에는 다음달의 마지막 날짜를 가진다.
    const nextDate =
      currentDate <= daysInNextMonth ? currentDate : daysInNextMonth;

    return new Date(nextYear, nextMonth, nextDate).toLocaleDateString();
  };

  const shipInfo = useSelector((state) => state.order.shipInfo);
  const paymentMethod = useSelector((state) => state.order.paymentMethod);
  const nav = useNavigate();

  const requestData = {
    startDate: new Date(getToday()), // 구독 시작일
    // endDate: new Date(getNextMonthSameDate()), // 구독 종료일 (다음 달)
    memberName: shipInfo.shipName, // 구독자 성함
    memberTel: shipInfo.shipTel, // 구독자 연락처
    mainAddress: shipInfo.mainAddress, // 배송지 주소
    subAddress: shipInfo.subAddress, // 배송지 상세주소
    shippingMessage: shipInfo.shipMessage, // 배송 메시지
    paymentMethod: paymentMethod, // 정기결제정보
    monthPaymentDate: getDay(), // 매달 결제일
    price: 29900, // 가격
    tasteResult: props.userTasteRes, // 취향 결과
  };

  const payStart = async () => {
    if (agree) {
      try {
        await axios.post("/startSubscribe", requestData, {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        });

        await axios
          .get("http://localhost:8080/subscribePayment/getCustomerKey", {
            headers: {
              Authorization: "Bearer " + getCookie("accessToken"),
            },
          })
          .then((res) => {
            //customerKey 받아와서 billingKey 발급요청 하는거임~
            const data = res.data;
            const clientKey = "test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq";
            const tossPayments = window.TossPayments(clientKey);

            tossPayments.requestBillingAuth("카드", {
              customerKey: data.customerKey,
              successUrl: "http://localhost:8080/billingAuthSuccess",
              failUrl: "http://localhost:3000/exp/subs/",
            });
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("서비스 가입에 동의해주세요.");
    }
  };

  return (
    <SubsPayForm>
      <Title>구독 결제정보</Title>
      <OrderContent>
        <div>
          <div>주문자</div>
          <div>{requestData.memberName}</div>
        </div>
        <div>
          <div>연락처</div>
          <div>{requestData.memberTel}</div>
        </div>
        <div>
          <div>배송지</div>
          <div>{requestData.mainAddress + " " + requestData.subAddress}</div>
        </div>
        <div>
          <div>결제 수단</div>
          <div>{requestData.paymentMethod}</div>
        </div>
        <div>
          <div>매달 결제일</div>
          <div>{requestData.monthPaymentDate}일</div>
        </div>
        <div>
          <div>결제 금액(월)</div>
          <div>{requestData.price.toLocaleString()}원</div>
        </div>
      </OrderContent>
      <SubsContent>
        <div>당신을 위한 Note "{props.userTasteRes}"</div>
        <div>
          매달 취향에 맞는 다양한 제품들을 받아보실 수 있습니다. <br />
          매달 제품을 사용하시고 후기를 남겨주세요.
        </div>
        <input
          type="checkbox"
          name="subsAgree"
          id="subsAgree"
          onChange={() => setAgree(!agree)}
        ></input>
        <label htmlFor="subsAgree">
          에이센틱의 구독서비스를 가입하시겠습니까?
        </label>
        <button
          disabled={agree === false ? true : false}
          onClick={() => payStart()}
        >
          결제진행
        </button>
      </SubsContent>
    </SubsPayForm>
  );
};

export default SubsPayInfo;

const SubsPayForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  width: 80%;
  text-align: left;
  font-size: 25px;
  font-weight: 700;
  padding-top: 10px;
`;

const OrderContent = styled.div`
  width: 70%;
  margin-top: 20px;
  background-color: white;

  > div {
    clear: both;
    border-bottom: 1px solid #d9d9d9;
    font-size: 1.1rem;
  }

  > div > div:nth-child(1) {
    margin: 15px 0;
    float: left;
  }

  > div > div:nth-child(2) {
    margin: 15px 0;
    font-size: 1.1rem;
    float: right;
  }

  > div:nth-child(6) {
    font-size: 23px;
    font-weight: 600;
  }
`;

const SubsContent = styled.div`
  width: 70%;
  margin-top: 20px;
  text-align: center;

  > div:nth-child(1) {
    margin-bottom: 10px;
    font-size: 1.3rem;
    font-weight: 700;
    color: black;
  }
  > div:nth-child(2) {
    margin-top: 15px;
    margin-bottom: 10px;
    font-size: 1rem;
    color: #557fb0;
    line-height: 1.2;
  }

  > input[type="checkbox"] + label {
    font-size: 1.1rem;
    font-weight: 500;
    background-color: #e6e6e6;
    cursor: pointer;
  }

  > button {
    position: absolute;
    bottom: 9%;
    right: 15%;
    padding: 0.7rem 8rem;
    font-size: 1.1rem;
    font-weight: 600;
    color: white;
    background-color: black;
    border: 1.5px solid black;
    cursor: pointer;
    &:hover {
      background-color: rgba(0, 0, 0, 0.8);
    }
  }

  > button:disabled {
    position: absolute;
    bottom: 9%;
    right: 15%;
    padding: 0.7rem 8rem;
    font-size: 1.1rem;
    font-weight: 600;
    color: white;
    background-color: gray;
    border: 1.5px solid gray;
  }
`;
