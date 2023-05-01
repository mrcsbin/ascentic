import React from "react";
import "../../styles/Order.css";
import ProdInfo from "../../components/order/ProdInfo";
import OrderInfo from "../../components/order/OrderInfo";

// 구매 과정 페이지
function Order() {
  return (
    <div>
      {/* 주문/결제 타이틀 */}
      <div className="title">주문 / 결제</div>
      {/* 주문 상품정보 */}
      <ProdInfo></ProdInfo>
      <OrderInfo></OrderInfo>
    </div>
  );
}

export default Order;
