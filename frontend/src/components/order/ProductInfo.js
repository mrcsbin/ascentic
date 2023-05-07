import React from "react";
import { useState } from "react";
import Prod from "./Prod";

// 주문 상품 정보
function ProdInfo(props) {
  // 상품 수량(임시)
  const [prodAmount, setProdAmount] = useState(3);

  return (
    <div>
      <div className="sub_title">
        주문 상품 정보
        <button onClick={props.changeExtend}>{props.extend ? "-" : "+"}</button>
      </div>
      {props.extend && (
        <div>
          {[...Array(prodAmount)].map((_, i) => (
            <Prod key={i} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProdInfo;
