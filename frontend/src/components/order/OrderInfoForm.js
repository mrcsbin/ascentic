import React, { useState } from "react";
import { useRef } from "react";

// 주문자 정보 입력 폼
// 이메일, 이름, 연력처, 동의 여부
function OrderInfoForm() {
  // 이메일 관련 변수
  const [email, setEmail] = useState("");
  //   const [domain, setDomain] = useState("");
  const domainRef = useRef(null);

  const userNameRef = useRef(null);
  const userPhoneRef = useRef(null);

  // 도메인 확인용(나중에 삭제)
  function domainChange() {
    console.log(domainRef.current.value);
  }

  function authBtn() {
    // 휴대폰 인증 관련 내용 추가
  }

  function saveAndNext() {
    // 저장하고 다음 단계 이동
  }

  return (
    <div className="order_form">
      <div>이메일</div>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      ></input>
      @<input type="text" ref={domainRef} onChange={domainChange}></input>
      <select ref={domainRef} onChange={domainChange}>
        <option value="">옵션 선택</option>
        <option value="naver.com">naver.com</option>
        <option value="gmail.com">gmail.com</option>
        <option value="hanmail.net">hanmail.net</option>
        <option value="nate.com">nate.com</option>
        <option value="yahoo.com">yahoo.com</option>
      </select>
      <div>이름</div>
      <input type="text" ref={userNameRef}></input>
      <div>연락처</div>
      <input type="text" ref={userPhoneRef}></input>
      <button onClick={authBtn}>인증하기</button>
      <input type="checkbox"></input> 모두 동의합니다.
      <input type="checkbox"></input> (필수)개인정보처리방침 동의 자세히 보기
      <input type="checkbox"></input> (필수)이용약관 동의 자세히 보기
      <button onClick={saveAndNext}></button>
    </div>
  );
}

export default OrderInfoForm;
