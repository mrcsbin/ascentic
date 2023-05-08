import React from "react";
import { useState } from "react";

// 할인 혜택
function DiscountBenefit(props) {
  // 보유 포인트 state
  const [holdPoint, setHoldPoint] = useState(0);
  // 사용 포인트 state
  const [usePoint, setUsePoint] = useState(0);

  // 저장하고 다음 단계로 버튼 이벤트
  function saveAndNext() {
    alert("저장되었습니다.");
    props.changeSaveExtend();
  }

  return (
    <div>
      <div className="sub_title">
        할인 혜택
        <button onClick={props.changeExtend}>{props.extend ? "-" : "+"}</button>
      </div>
      {props.extend && (
        <div className="discount_benifit_form">
          <div>
            <div>보유 포인트</div>
            <input
              type="text"
              value={holdPoint}
              dir="rtl"
              disabled={true}
            ></input>
          </div>
          <div>
            <div>포인트 사용</div>
            <input
              placeholder="0"
              dir="rtl"
              onChange={(e) => {
                setUsePoint(e.target.value);
              }}
            ></input>
            <button>사용불가</button>
          </div>
          <div>배송비, 샘플키트는 포인트 결제 적용되지 않습니다.</div>
          <button onClick={saveAndNext}>저장하고 다음 단계로</button>
        </div>
      )}
    </div>
  );
}

export default DiscountBenefit;
