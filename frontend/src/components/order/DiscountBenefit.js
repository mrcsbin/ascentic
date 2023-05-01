import React from "react";
import { useState } from "react";

// 할인 혜택
function DiscountBenefit() {
  // +, - 확장응 위한 State
  const [detail, setDetail] = useState(false);

  // +, - 버튼 클릭이벤트
  function changeDetail() {
    setDetail(!detail);
  }

  return (
    <div>
      <div className="sub_title">
        할인 혜택
        <button onClick={changeDetail}>{detail ? "-" : "+"}</button>
      </div>
      {detail && <h1>할인 혜택 폼</h1>}
    </div>
  );
}

export default DiscountBenefit;
