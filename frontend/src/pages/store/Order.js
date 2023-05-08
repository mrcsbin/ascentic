import React, { useState } from "react";
import "../../styles/Order.css";
import ProductInfo from "../../components/order/ProductInfo";
import OrderInfo from "../../components/order/OrderInfo";
import DiscountBenefit from "../../components/order/DiscountBenefit";
import DeliveryInfo from "../../components/order/DeliveryInfo";
import Payment from "../../components/order/Payment";
import FinalPayment from "../../components/order/FinalPayment";
import axios from "axios";
import { useEffect } from "react";
// import Cookies from "js-cookie";

// 구매 과정 페이지
function Order(props) {
  // 컴포넌트 별 정리
  // ProductInfo:  url로 받아온 제품정보, 옵션, 수량, 가격
  // OrderInfo: useEffect => 세션값에 따른 주문자 정보(이메일, 이름, 연락처)
  // DeliveryInfo: 없음,
  // 주문자 정보와 동일 클릭시 주문자 정보 가져오기, 최근배송지 클릭시 session id에 해당하는 최근배송지 불러오기
  // DiscountBenefit: 없음
  // FinalPayment: 없음, 클릭시 해당 결제수단의 state값을 가지고 있고
  // FinalPayment: 주문금액, 배송비 총금액
  // 구매하기 클릭시
  // 1. 주문자정보, 배송정보, 총금액, 배송비, 결제방법 서버로 전송
  // 2. 주문번호 받아와서 상품1개씩 묶어서 서버로 전송

  // 인증 토큰 읽는 방법
  // npm install js-cookie 쿠키 라이브러리
  // const token = localStorage.getItem("autoToken"); // 로컬 스토리지, authToken = 키
  // const token = Cookies.get("autoToken"); // 쿠키
  localStorage.setItem("autoToken", "kim123"); // 임시
  const token = localStorage.getItem("autoToken");

  // +, - 확장응 위한 State
  const [extend, setExtend] = useState({
    prod: true,
    order: false,
    delivery: false,
    disCount: false,
    payment: false,
  });

  // +, - 버튼 클릭이벤트
  function handleExtendChange(type) {
    setExtend({
      ...extend,
      [type]: !extend[type],
    });
  }

  // 저장 후 자동으로 다음 컴포넌트 확장
  function handleSaveChange(type) {
    setExtend({
      ...extend,
      [type]: true,
    });
  }

  // ---------------------- ProductInfo -------------------------------------

  // ---------------------- OrderInfo -------------------------------------
  const [order, setOrder] = useState({
    email: "example",
    domain: "naver.com",
    name: "김기자",
    tel: "01012341234",
  });

  function changeOrder(updatedOrder) {
    setOrder(updatedOrder);
  }

  // 회원 정보 조회
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("/get_member", { params: { token } });
        const { memberEmail, name, tel } = res.data;
        setOrder({
          email: memberEmail,
          name,
          tel,
        });
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  // ---------------------- DeliveryInfo -------------------------------------

  const [shipInfo, setShipInfo] = useState({
    shipName: "", // 수령인
    shipTel: "", // 연락처
    mainAddress: "", // 메인배송지
    subAddress: "", // 상세주소
    shipMessage: "", // 기사님께 전하는 메시지
  });

  // 주문자 정보와 동일
  function getOrderInfo() {
    setShipInfo({
      ...shipInfo,
      shipName: order.name,
      shipTel: order.tel,
    });
  }

  // 최근 배송지
  function getRecentAddress() {
    async function fetchData() {
      try {
        const res = await axios.post("/recentaddr", { memberId: token });

        setShipInfo({
          ...shipInfo,
          mainAddress: res.data.shipMainAddress,
          subAddress: res.data.shipSubAddress,
        });
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }

  // 배송 정보 변경
  function changeShipInfo(updatedOrder) {
    setShipInfo(updatedOrder);
  }

  // ---------------------- DiscountBenefit -------------------------------------

  // ---------------------- Payment -------------------------------------
  const [payMethod, setPayMethod] = useState({
    kakao: true,
    naver: false,
    card: false,
    deposit: false,
    account: false,
  });

  function handleKakao() {
    setPayMethod({
      kakao: true,
      naver: false,
      card: false,
      deposit: false,
      account: false,
    });
  }

  function handleNaver() {
    setPayMethod({
      kakao: false,
      naver: true,
      card: false,
      deposit: false,
      account: false,
    });
  }

  function handleCard() {
    setPayMethod({
      kakao: false,
      naver: false,
      card: true,
      deposit: false,
      account: false,
    });
  }

  function handleDeposit() {
    setPayMethod({
      kakao: false,
      naver: false,
      card: false,
      deposit: true,
      account: false,
    });
  }

  function handleAccount() {
    setPayMethod({
      kakao: false,
      naver: false,
      card: false,
      deposit: false,
      account: true,
    });
  }

  // ---------------------- FinalPayment -------------------------------------

  return (
    <div>
      {/* 주문/결제 타이틀 */}
      <div className="title">주문 / 결제</div>
      {/* 주문 정보 */}
      <div className="order_body">
        <div className="left">
          <ProductInfo
            extend={extend.prod}
            changeExtend={() => handleExtendChange("prod")}
          ></ProductInfo>
          <OrderInfo
            extend={extend.order}
            changeExtend={() => handleExtendChange("order")}
            changeSaveExtend={() => handleSaveChange("delivery")}
            order={order}
            changeOrder={changeOrder}
          ></OrderInfo>
          <DeliveryInfo
            extend={extend.delivery}
            shipInfo={shipInfo}
            changeExtend={() => handleExtendChange("delivery")}
            getOrderInfo={() => getOrderInfo()}
            changeShipInfo={changeShipInfo}
            getRecentAddress={getRecentAddress}
          ></DeliveryInfo>
          <DiscountBenefit
            extend={extend.disCount}
            changeExtend={() => handleExtendChange("disCount")}
            changeSaveExtend={() => handleSaveChange("payment")}
          ></DiscountBenefit>
          <Payment
            payMethod={payMethod}
            extend={extend.payment}
            changeExtend={() => handleExtendChange("payment")}
            handleKakao={() => handleKakao()}
            handleNaver={() => handleNaver()}
            handleCard={() => handleCard()}
            handleDeposit={() => handleDeposit()}
            handleAccount={() => handleAccount()}
          ></Payment>
          <div className="order_notice">
            · 환경부 고시에 따라, 기본 쇼핑백이 제공되지 않습니다.
            <br />
            <br />· 수령일로부터 14일 이내 청약철회(반품)가 가능합니다. 단, 제품
            개봉 시 반품 불가합니다. 자세한 내용은 <a href="#">반품 및 환불</a>
            을 확인해주세요.
            <br />
            <br />· (주말 및 공휴일 제외) 주문 상품 품절/배송 지연 예상 시
            유선/SNS 안내, 일부 군사지역은 배송이 불가능할 수 있습니다.
            <br />
            <br />· 도움이 필요하신가요? 더 궁금하신 사항이 있다면 [a]scentic
            고객센터[1644-1111]로 문의하여 주십시오.
          </div>
        </div>

        <div className="right">
          <FinalPayment></FinalPayment>
        </div>
      </div>
    </div>
  );
}

export default Order;
