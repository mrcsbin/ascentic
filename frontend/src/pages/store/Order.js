import React from "react";
import "../../styles/Order.css";
import ProdInfo from "../../components/order/ProdInfo";

// 구매 과정 페이지
function Order() {
  return (
    <div>
      {/* 주문/결제 타이틀 */}
      <div className="title">주문 / 결제</div>
      {/* 주문 상품정보 */}
      <ProdInfo></ProdInfo>
    </div>
  );
}

export default Order;
