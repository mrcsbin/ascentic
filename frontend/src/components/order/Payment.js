import React from "react";
import { useState } from "react";

// 결제 수단
function Payment(props) {
  return (
    <div>
      <div className="sub_title">
        결제 수단
        <button onClick={props.changeExtend}>{props.extend ? "-" : "+"}</button>
      </div>
      {props.extend && (
        <div className="payment_method">
          <div>
            <button
              onClick={() => props.handleKakao()}
              disabled={props.payMethod.kakao}
              style={{
                backgroundColor: props.payMethod.kakao ? "black" : "",
                color: props.payMethod.kakao ? "white" : "",
              }}
            >
              카카오페이
            </button>
            <button
              onClick={() => props.handleNaver()}
              disabled={props.payMethod.naver}
              style={{
                backgroundColor: props.payMethod.naver ? "black" : "",
                color: props.payMethod.naver ? "white" : "",
              }}
            >
              네이버페이
            </button>
            <button
              onClick={() => props.handleCard()}
              disabled={props.payMethod.card}
              style={{
                backgroundColor: props.payMethod.card ? "black" : "",
                color: props.payMethod.card ? "white" : "",
              }}
            >
              신용카드
            </button>
            <button
              onClick={() => props.handleDeposit()}
              disabled={props.payMethod.deposit}
              style={{
                backgroundColor: props.payMethod.deposit ? "black" : "",
                color: props.payMethod.deposit ? "white" : "",
              }}
            >
              무통장 입금
            </button>
            <button
              onClick={() => props.handleAccount()}
              disabled={props.payMethod.account}
              style={{
                backgroundColor: props.payMethod.account ? "black" : "",
                color: props.payMethod.account ? "white" : "",
              }}
            >
              실시간 계좌이체
            </button>
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
