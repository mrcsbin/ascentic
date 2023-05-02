import React from "react";
import { useState } from "react";
import Prod from "./Prod";

// 주문 상품 정보
function ProdInfo() {
  // +, - 확장응 위한 State
  const [detail, setDetail] = useState(false);

  // +, - 버튼 클릭이벤트
  function changeDetail() {
    setDetail(!detail);
  }

  return (
    <div>
      <div className="sub_title">
        주문 상품 정보
        <button onClick={changeDetail}>{detail ? "-" : "+"}</button>
      </div>
      {detail && <Prod></Prod>}
    </div>
  );
}

export default ProdInfo;
