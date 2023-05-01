import React from "react";
import { useState } from "react";

// 배송 정보
function DeliveryInfo() {
  // +, - 확장응 위한 State
  const [detail, setDetail] = useState(false);

  // +, - 버튼 클릭이벤트
  function changeDetail() {
    setDetail(!detail);
  }

  return (
    <div>
      <div className="sub_title">
        배송 정보
        <button onClick={changeDetail}>{detail ? "-" : "+"}</button>
      </div>
      {detail && <h1>배송 정보 폼</h1>}
    </div>
  );
}

export default DeliveryInfo;
