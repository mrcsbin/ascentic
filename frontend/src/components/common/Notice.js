import React, { useState, useEffect } from "react";
import "../../styles/Notice.css";

//HSM
//RouteTest.js 에 임시로 연결

function Notice() {
  const [showNotice, setShowNotice] = useState(true);

  // 공지사항을 닫습니다
  const handleHideNotice = () => {
    setShowNotice(false);
  };

  // 24시간 동안 보이지 않습니다 (초기화는 아래 removeHideUntil 이용)
  const handleClickIgnore = () => {
    const now = new Date().getTime();
    localStorage.setItem("hideUntil", now + 24 * 60 * 60 * 1000);
    setShowNotice(false);
  };

  useEffect(() => {
    const hideUntil = localStorage.getItem("hideUntil");
    if (hideUntil) {
      const now = new Date().getTime();
      if (now < hideUntil) {
        setShowNotice(false);
      }
    }
  }, []);

  // 24시간 초기화 합니다 사용법 : 1.setShowNotice(true)로 바꾸고 2. .ignore-btn 에 {removeHideUntil} 추가해서 사용
  //   function removeHideUntil() {
  //     localStorage.removeItem("hideUntil");
  //     setShowNotice(true);
  //   }

  return (
    <div
      className={`notice-bar ${showNotice ? "" : "hidden"}`}
      style={{ display: showNotice ? "block" : "none" }}
    >
      <button className="popup-btn" onClick="">
        <div>신규가입 시 10% 할인쿠폰 제공</div>
      </button>
      {/* <button className="ignore-btn" onClick={removeHideUntil}> 24시간 초기화 버튼입니다*/}
      <button className="ignore-btn" onClick={handleClickIgnore}>
        오늘 하루 보지 않기
      </button>
      <button className="close-btn" onClick={handleHideNotice}>
        X
      </button>
    </div>
  );
}

export default Notice;
