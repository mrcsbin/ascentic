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

  function payKakao() {
    // 카카오 페이 결제수단 선택
  }
  function payNaver() {
    // 네이버 페이 결제수단 선택
  }
  function payCard() {
    // 신용카드 결제수단 선택
  }
  function payDeposit() {
    // 무통장 입금 결제수단 선택
  }
  function payAccount() {
    // 실시간 계좌이체 결제수단 선택
  }

  return (
    <div>
      <div className="sub_title">
        결제 수단
        <button onClick={changeDetail}>{detail ? "-" : "+"}</button>
      </div>
      {detail && (
        <div className="payment_method">
          <div>
            <button onClick={payKakao}>카카오페이</button>
            <button onClick={payNaver}>네이버페이</button>
            <button onClick={payCard}>신용카드</button>
            <button onClick={payDeposit}>무통장 입금</button>
            <button onClick={payAccount}>실시간 계좌이체</button>
          </div>
          <div>
            고객님의 안전한 현금자산 거래를 위하여 하나은행과
            <br />
            <br />
            채무지급보증계약을 체결하여 보장해드리고 있습니다.
            <br />
            <br />
            <a href="#">서비스 가입사실 확인</a>
          </div>
        </div>
      )}
    </div>
  );
}

export default Payment;
