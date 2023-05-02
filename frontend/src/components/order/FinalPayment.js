import React from "react";
import { useState } from "react";

// 최종 결제금액
function FinalPayment() {
  // 동의 관련 state
  const [allAgree, setAllAgree] = useState(false);
  const [checkValues, setCheckValues] = useState({
    check1: false,
    check2: false,
    check3: false,
    check4: false,
  });

  // 동의 체크 이벤트
  const handleCheckChange = (e) => {
    const { name, checked } = e.target;
    setCheckValues((prev) => ({ ...prev, [name]: checked }));
  };

  // 모두 동의 체크 이벤트
  const handleCheckAllChange = (e) => {
    const { checked } = e.target;
    setCheckValues({
      check1: checked,
      check2: checked,
      check3: checked,
      check4: checked,
    });
  };

  // 구매하기 버튼 클릭 이벤트
  const buySubmit = (e) => {
    e.preventDefault();
    const { check1, check2, check3, check4 } = checkValues;

    if (check1 && check2 && check3 && check4) {
      alert("결제를 진행하겠습니다.");
    } else {
      alert("모두 동의가 필요합니다.");
    }
  };

  return (
    <div>
      <div className="final_sub_title">최종 결제금액</div>
      {/* 결제정보 */}
      <div className="final_content">
        <div>
          <div>주문금액</div>
          <div>95,000원</div>
        </div>
        <div>
          <div>배송비</div>
          <div>+2,500원</div>
        </div>
        <div>
          <div>할인 금액</div>
          <div>0원</div>
        </div>
        <div>
          <div>총 금액</div>
          <div>97,500원</div>
        </div>
      </div>
      <div className="final_agree">
        <div>
          <input
            type="checkbox"
            name="allAgree"
            checked={checkValues.allAgree}
            onChange={handleCheckAllChange}
          ></input>{" "}
          모두 동의합니다.
        </div>
        <div>
          <input
            type="checkbox"
            name="check1"
            checked={checkValues.check1}
            onChange={handleCheckChange}
          ></input>{" "}
          (필수)본인은 만 14세 미만이 아닙니다.
        </div>
        <div>
          <input
            type="checkbox"
            name="check2"
            checked={checkValues.check2}
            onChange={handleCheckChange}
          ></input>{" "}
          (필수)이용약관에 동의합니다.
        </div>
        <div>
          <input
            type="checkbox"
            name="check3"
            checked={checkValues.check3}
            onChange={handleCheckChange}
          ></input>{" "}
          (필수)개인정보처리방침에 동의합니다.
        </div>
        <div>
          <input
            type="checkbox"
            name="check4"
            checked={checkValues.check4}
            onChange={handleCheckChange}
          ></input>{" "}
          (필수)위 주문의 상품, 가격, 할인, 배송 정보에 동의합니다.
        </div>
      </div>
      <button id="buy_btn" onClick={buySubmit}>
        구매하기
      </button>
    </div>
  );
}

export default FinalPayment;
