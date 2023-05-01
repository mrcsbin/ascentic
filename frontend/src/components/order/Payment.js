import React from "react";
import { useState } from "react";

// 결제 수단
function Payment() {
  // +, - 확장응 위한 State
  const [detail, setDetail] = useState(false);

  // +, - 버튼 클릭이벤트
  function changeDetail() {
    setDetail(!detail);
  }

  return (
    <div>
      <div className="sub_title">
        결제 수단
        <button onClick={changeDetail}>{detail ? "-" : "+"}</button>
      </div>
      {detail && <h1>결제 수단 폼</h1>}
    </div>
  );
}

export default Payment;
