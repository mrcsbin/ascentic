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
import { getCookie } from "../../utils/Cookie";
import { useLocation } from "react-router-dom";

// 구매 과정 페이지
function Order(props) {
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
  const location = useLocation();
  const products = [
    // 서버로 전송할 정보
    {
      option: location.state.prodOption.optionNum,
      count: location.state.prodQuantity,
    },
  ];

  const prods = [
    {
      prodName: location.state.prodOption.product.prodName,
      prodOption: location.state.prodOption.prodOption,
      prodeQunanity: location.state.prodQuantity,
      prodPrice:
        location.state.prodOption.product.prodPrice *
        location.state.prodQuantity, // 수량  x 가격
      prodNum: location.state.prodOption.product.prodNum,
    },
  ];

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
  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const res = await axios.get("/get_member", null, {
  //         headers: {
  //           Authorization: "Bearer " + getCookie("accessToken"),
  //         },
  //       });
  //       const { memberEmail, name, tel } = res.data;
  //       setOrder({
  //         email: memberEmail,
  //         name,
  //         tel,
  //       });
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  //   fetchData();
  // }, []);

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
        const res = await axios.get("/recentaddr", {
          headers: {
            Authorization: "Bearer " + getCookie("accessToken"),
          },
        });

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

  const [paymentMethod, setPaymentMethod] = useState("kokao");

  function handleKakao() {
    setPayMethod({
      kakao: true,
      naver: false,
      card: false,
      deposit: false,
      account: false,
    });
    setPaymentMethod("kokao");
  }

  function handleNaver() {
    setPayMethod({
      kakao: false,
      naver: true,
      card: false,
      deposit: false,
      account: false,
    });
    setPaymentMethod("naver");
  }

  function handleCard() {
    setPayMethod({
      kakao: false,
      naver: false,
      card: true,
      deposit: false,
      account: false,
    });
    setPaymentMethod("card");
  }

  function handleDeposit() {
    setPayMethod({
      kakao: false,
      naver: false,
      card: false,
      deposit: true,
      account: false,
    });
    setPaymentMethod("deposit");
  }

  function handleAccount() {
    setPayMethod({
      kakao: false,
      naver: false,
      card: false,
      deposit: false,
      account: true,
    });
    setPaymentMethod("account");
  }

  // ---------------------- FinalPayment -------------------------------------

  const buySubmit = () => {
    const requestData = {
      // memberId: token, // 주문자 id
      orderEmail: order.email + "@" + order.domain, // 주문자 이메일
      orderName: order.name, // 주문자 이름
      orderTel: order.tel, // 주문자 연락처
      shipName: shipInfo.shipName, // 수령인
      shipTel: shipInfo.shipTel, // 연락처
      shipMainAddress: shipInfo.mainAddress, // 메인주소
      shipSubAddress: shipInfo.subAddress, // 상세주소
      shipMessage: shipInfo.shipMessage, // 배송메시지
      orderPayment: paymentMethod, // 결제 수단
      orderPayInfo: "결제정보입니다!", // 카드번호, 결제관련 정보
      orderPaymentState: false, // true: 결제완료, flase: 결제실패
      orderState: "결제완료", // 결제완료, 배송준비중, 배송중, 배송완료
    };

    // console.log(requestData);
    let orderNum;

    axios
      .post("/finishorder", requestData, {
        headers: {
          Authorization: "Bearer " + getCookie("accessToken"),
        },
      })
      .then((response) => {
        orderNum = response.data; // 주문 번호를 받아온다.

        const orderProd = [];
        products.forEach((item, index) => {
          orderProd.push({
            orderId: orderNum, // 주문 번호
            optionNum: item.option, // 옵션 번호(기본키)
            prodCount: item.count, // 수량
            orderState: false, // 주문 상태 true: 주문, flase 주문 취소
          });
        });

        // 상품주문 만큼 서버에 요청을 한다.
        for (let i = 0; i < orderProd.length; i++) {
          const proddata = {
            orderId: orderNum,
            optionNum: orderProd[i].optionNum,
            prodCount: orderProd[i].prodCount,
            orderState: false,
          };

          axios
            .post("/finishorderprod", proddata)
            .then((response) => {
              console.log(response.data);
            })
            .catch((error) => {
              console.error(error);
            });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

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
            prods={prods}
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
          <FinalPayment buySubmit={buySubmit}></FinalPayment>
        </div>
      </div>
    </div>
  );
}

export default Order;
