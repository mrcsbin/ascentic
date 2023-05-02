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
        </div>
      </div>
    </div>
  );
}

export default Order;
