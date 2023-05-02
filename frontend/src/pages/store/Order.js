import React from "react";
import "../../styles/Order.css";
import ProductInfo from "../../components/order/ProductInfo";
import OrderInfo from "../../components/order/OrderInfo";
import DiscountBenefit from "../../components/order/DiscountBenefit";
import DeliveryInfo from "../../components/order/DeliveryInfo";
import Payment from "../../components/order/Payment";
import FinalPayment from "../../components/order/FinalPayment";

// 구매 과정 페이지
function Order() {
  return (
    <div>
      {/* 주문/결제 타이틀 */}
      <div className="title">주문 / 결제</div>
      {/* 주문 상품정보 */}
      <div className="order_body">
        <div className="left">
          <ProductInfo></ProductInfo>
          <OrderInfo></OrderInfo>
          <DeliveryInfo></DeliveryInfo>
          <DiscountBenefit></DiscountBenefit>
          <Payment></Payment>
        </div>

        <div className="right">
          <FinalPayment></FinalPayment>
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
      </div>
    </div>
  );
}

export default Order;
