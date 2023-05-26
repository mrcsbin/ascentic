import ProductInfo from "../../components/order/ProductInfo";
import OrderInfo from "../../components/order/OrderInfo";
import DiscountBenefit from "../../components/order/DiscountBenefit";
import DeliveryInfo from "../../components/order/DeliveryInfo";
import Payment from "../../components/order/Payment";
import FinalPayment from "../../components/order/FinalPayment";
import { useLocation } from "react-router-dom";
import ExtendAble from "../../components/order/ExtendAble";

import { useDispatch, useSelector } from "react-redux";
import { extendChange } from "../../store/modules/order";

import styled from "styled-components";

// 구매 과정 페이지
const Order = () => {
  // 확장
  const dispatch = useDispatch(); // action 객체를 보내는 훅
  const extend = useSelector((state) => state.order.extend); // state를 가져오는 훅

  const handleExtendChange = (type) => {
    dispatch(extendChange({ type }));
  };

  // 상품정보 (서버에 전송할 데이터)
  const location = useLocation();
  console.log(location.state.cartItems);
  const cartItems = location.state.cartItems;

  // const products = [
  //   // 서버로 전송할 정보
  //   // 옵션, 수량
  //   {
  //     option: location.state.prodOption.optionNum,
  //     count: location.state.prodQuantity,
  //   },
  // ];

  // // 상품 정보
  // const products = [
  //   {
  //     prodImage: cartItems.prodImage,
  //     prodName: cartItems.prodName,
  //     prodOption: cartItems.prodOption,
  //     prodQuantity: cartItems.prodCount,
  //     prodPrice: cartItems.prodPrice * cartItems.prodCount, // 수량  x 가격
  //     prodNum: cartItems.prodNum,
  //   },
  // ];

  return (
    <OrderWrap>
      <Title>주문 / 결제</Title>
      <OrderBody>
        <Left>
          <ExtendAble
            title="주문 상품 정보"
            isOpen={extend.prod}
            onClick={() => handleExtendChange("prod")}
          >
            {cartItems.map((item, index) => (
              <ProductInfo item={item} key={index} />
            ))}
          </ExtendAble>

          <ExtendAble
            title="주문자 정보"
            isOpen={extend.order}
            onClick={() => handleExtendChange("order")}
          >
            <OrderInfo />
          </ExtendAble>

          <ExtendAble
            title="배송 정보"
            isOpen={extend.delivery}
            onClick={() => handleExtendChange("delivery")}
          >
            <DeliveryInfo />
          </ExtendAble>

          <ExtendAble
            title="할인 혜택"
            isOpen={extend.disCount}
            onClick={() => handleExtendChange("disCount")}
          >
            <DiscountBenefit />
          </ExtendAble>

          <ExtendAble
            title="결제 수단"
            isOpen={extend.payment}
            onClick={() => handleExtendChange("payment")}
          >
            <Payment />
          </ExtendAble>

          <OrderNotice>
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
          </OrderNotice>
        </Left>
        <Right>
          {/* <FinalPayment prods={prods} products={products}></FinalPayment> */}
          <FinalPayment products={cartItems} />
        </Right>
      </OrderBody>
    </OrderWrap>
  );
};

export default Order;

const OrderWrap = styled.div`
  // OrderWrap 스타일 정의
  padding-top: 150px;
  margin-left: 150px;
`;

const Title = styled.div`
  width: 762px;
  height: 60px;
  font-size: 32px;
`;

const OrderBody = styled.div`
  // OrderBody 스타일 정의
  display: flex;
`;

const Left = styled.div`
  // Left 스타일 정의
`;

const OrderNotice = styled.div`
  color: red;
  font-size: 10px;
  margin-top: 40px;
  margin-left: 10px;
  width: 719px;
  height: 150px;
  border-top: 1px solid #d9d9d9;
  padding-top: 40px;
  transform: matrix(1, 0, -0.01, 1, 0, 0);

  > a {
    color: #cfa614;
  }
`;

const Right = styled.div`
  // Right 스타일 정의
  margin-left: 142px;
`;
