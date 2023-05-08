import React, { useState, useEffect } from "react";
import "../../styles/Notice.css";
import popupDiscount from "../../assets/popupDiscount.svg";
import { Link } from "react-router-dom";

function Notice() {
  const [showNotice, setShowNotice] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

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

  const handleShowPopup = () => {
    setShowPopup(true);
  };

  const handleHidePopup = () => {
    setShowPopup(false);
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
      <button className="popup-btn" onClick={handleShowPopup}>
        <div>신규가입 시 10% 할인쿠폰 제공</div>
      </button>
      {/* <button className="ignore-btn" onClick={removeHideUntil}> 24시간 초기화 버튼입니다*/}
      <button className="ignore-btn" onClick={handleClickIgnore}>
        오늘 하루 보지 않기
      </button>
      <button className="close-btn" onClick={handleHideNotice}>
        X
      </button>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <img src={popupDiscount} alt="popupDiscount"></img>
            <br />
            <p>
              <b>신규가입 시 10% 할인쿠폰 발급가능</b>
            </p>
            <p>
              7/1 까지 신규가입하시는 모든분께 할인쿠폰을 드립니다.
              <br />
              *일부 상품에는 적용이 불가합니다.
            </p>
            <div className="popup-link-box">
              <button className="popup-link-btn">
                <Link to="/" onClick={handleHidePopup} className="popup-link">
                  자세히 보기
                </Link>
              </button>
              <br />
              <button className="popup-close-btn" onClick={handleHidePopup}>
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Notice;
