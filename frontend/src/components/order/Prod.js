import React from "react";

// 주문 상품 컴포넌트
// 상품이미지, 상품명, 옵션, 수량, 가격
function Prod(props) {
  return (
    <div className="prod_info">
      <img src={process.env.PUBLIC_URL + "/test.jpg"} alt="상품이미지" />
      <div className="purchase_info">
        <div>상품명 핸드크림 {props.prod_name}</div>
        <div>300ml / 1개{props.prod_price}</div>
      </div>
      <div>
        <div>70,000원{props.prod_price}</div>
      </div>
    </div>
  );
}

export default Prod;
