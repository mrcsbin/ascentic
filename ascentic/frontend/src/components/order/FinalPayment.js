import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { requestOrder } from "../../api/OrderApi";
import { getCookie } from "../../utils/Cookies";
import styled from "styled-components";

// 최종 결제금액
const FinalPayment = ({
  products,
  isOrderFormComplete,
  isDeliveryFormComplete,
}) => {
  // 동의 관련 state
  const [checkValues, setCheckValues] = useState({
    check1: false,
    check2: false,
    check3: false,
    check4: false,
  });

  // const prodSumPrice = products.reduce((sum, item) => sum + item.prodPrice, 0);
  // 동의 체크 이벤트
  const handleCheckChange = (e) => {
    const { name, checked } = e.target;
    setCheckValues((prev) => ({ ...prev, [name]: checked }));
  };

  // 모두 동의 체크 이벤트
  const handleCheckAllChange = (e) => {
    const { checked } = e.target;
    setCheckValues({
      check1: checked,
      check2: checked,
      check3: checked,
      check4: checked,
    });
  };

  // 전역 state
  const orderInformation = useSelector((state) => state.order.orderInformation);
  const shipInfo = useSelector((state) => state.order.shipInfo);
  const paymentMethod = useSelector((state) => state.order.paymentMethod);
  const pointInfo = useSelector((state) => state.order.pointInfo);

  // 상품정보
  // const prods = props.prods;
  // const products = props.products;
  const accessToken = getCookie("accessToken");

  // 상품들의 총금액 구하기
  const prodSumPrice = products.reduce((acc, cur) => {
    return acc + cur.productPrice * cur.productCount;
  }, 0);

  const [shippingFee, setShippingFee] = useState(
    prodSumPrice > 30000 ? 0 : 2500
  );

  const prodNames = products.map((product) => product.productName);
  const prodNamesString = prodNames.join(" ,");

  // order 요청 데이터
  const requestData = {
    // memberId: token, // 주문자 id
    orderEmail: orderInformation.email + "@" + orderInformation.domain, // 주문자 이메일
    orderName: orderInformation.name, // 주문자 이름
    orderTel: orderInformation.tel, // 주문자 연락처
    shipName: shipInfo.shipName, // 수령인
    shipTel: shipInfo.shipTel, // 연락처
    shipMainAddress: shipInfo.mainAddress, // 메인주소
    shipSubAddress: shipInfo.subAddress, // 상세주소
    shippingMessage: shipInfo.shipMessage, // 배송메시지
    orderPayment: paymentMethod, // 결제 수단
    orderPaymentInfo: "결제정보입니다!", // 카드번호, 결제관련 정보
    orderPaymentState: false, // true: 결제완료, false: 결제실패
    orderState: "결제대기중", // 결제대기중 ,결제완료, 배송준비중, 배송중, 배송완료
    orderPriceSum: prodSumPrice, // 상품 총 금액
    shipCharge: shippingFee, // 배송비
    discount: 0, //할인 금액
    prodNames: prodNamesString,
    usePoint: pointInfo.usePoint,
  };

  // requestData.orderPriceSum
  // requestData.shipCharge
  const [buttonDisable, setButtonDisable] = useState(false);
  useEffect(() => {
    const { check1, check2, check3, check4 } = checkValues;
    setButtonDisable(
      !isOrderFormComplete ||
        !isDeliveryFormComplete ||
        !check1 ||
        !check2 ||
        !check3 ||
        !check4
    );
  }, [isOrderFormComplete, isDeliveryFormComplete, buttonDisable, checkValues]);
  // 구매하기 버튼 클릭 이벤트
  const buySubmit = async () => {
    const { check1, check2, check3, check4 } = checkValues;

    if (check1 && check2 && check3 && check4) {
      alert("결제를 진행하겠습니다.");
      try {
        console.log("FinalPayment");
        console.log(products);
        const res = await requestOrder(accessToken, requestData, products);
      } catch (e) {
        console.log(e);
        console.error(e);
      }
    } else {
      alert("모두 동의가 필요합니다.");
    }
  };

  function addComma(num) {
    var regexp = /\B(?=(\d{3})+(?!\d))/g;
    return num.toString().replace(regexp, ",");
  }

  return (
    <FinalPay disabled={buttonDisable}>
      <FinalSubTitle>최종 결제금액</FinalSubTitle>
      {/* 결제정보 */}
      <FinalContent>
        <div>
          <div>주문금액</div>
          <div>{addComma(requestData.orderPriceSum)}원</div>
        </div>
        <div>
          <div>배송비</div>
          <div>+{addComma(requestData.shipCharge)}원</div>
        </div>
        <div>
          <div>포인트</div>
          <div>-{addComma(requestData.usePoint)}원</div>
        </div>
        <div>
          <div>총 금액</div>
          <div>
            {addComma(
              requestData.orderPriceSum +
                requestData.shipCharge -
                requestData.usePoint
            )}
            원
          </div>
        </div>
      </FinalContent>
      <FinalAgree>
        <div
          onClick={() =>
            handleCheckAllChange({ target: { checked: !checkValues.allAgree } })
          }
        >
          <input
            type="checkbox"
            name="allAgree"
            checked={checkValues.allAgree}
            onChange={handleCheckAllChange}
          ></input>
          모두 동의합니다.
        </div>
        <div>
          <input
            type="checkbox"
            name="check1"
            checked={checkValues.check1}
            onChange={handleCheckChange}
          ></input>
          (필수)본인은 만 14세 미만이 아닙니다.
        </div>
        <div>
          <input
            type="checkbox"
            name="check2"
            checked={checkValues.check2}
            onChange={handleCheckChange}
          ></input>
          (필수)이용약관에 동의합니다.
        </div>
        <div>
          <input
            type="checkbox"
            name="check3"
            checked={checkValues.check3}
            onChange={handleCheckChange}
          ></input>
          (필수)개인정보처리방침에 동의합니다.
        </div>
        <div>
          <input
            type="checkbox"
            name="check4"
            checked={checkValues.check4}
            onChange={handleCheckChange}
          ></input>{" "}
          (필수)위 주문의 상품, 가격, 할인, 배송 정보에 동의합니다.
        </div>
      </FinalAgree>
      <button onClick={() => buySubmit()} disabled={buttonDisable}>
        구매하기
      </button>
    </FinalPay>
  );
};

export default FinalPayment;

const FinalSubTitle = styled.div`
  margin-left: 10px;
  border: none;
  width: 562px;
  height: 27px;
  font-weight: 700;
  font-size: 24px;
  display: flex;
  justify-content: space-between;
  padding-top: 28px;

  border-top: 1px solid #d9d9d9;
  transform: matrix(1, 0, -0.01, 1, 0, 0);
`;

const FinalContent = styled.div`
  > div {
    border-bottom: 1px solid #d9d9d9;
    transform: matrix(1, 0, -0.01, 1, 0, 0);
    /* background-color: aqua; */
    width: 562px;
    height: 53px;
    margin-left: 10px;
    margin-bottom: 15px;
    font-size: 20px;
  }

  > div > div:nth-child(1) {
    margin-top: 15px;
    float: left;
  }

  > div > div:nth-child(2) {
    margin-top: 15px;
    float: right;
  }

  > div:nth-child(4) {
    font-weight: 700;
    font-size: 28px;
  }
`;

const FinalAgree = styled.div`
  width: 562px;
  height: 185px;
  margin-left: 20px;
  margin-top: 26px;
  label {
    cursor: pointer;
  }
  > div:nth-child(1) {
    margin-bottom: 30px;
  }

  > div {
    margin-bottom: 5px;
  }
`;

const FinalPay = styled.div`
  button {
    margin-left: 60px;
    color: white;
    background-color: ${(props) => (props.disabled ? "gray" : "black")};
    width: 455px;
    height: 50px;
    font-size: 18px;
    opacity: ${(props) => (props.disabled ? "0.5" : "1")};
    pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
    cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  }
`;
