import React, { useState, useEffect } from "react";
import "../../styles/Notice.css";
import popupDiscount from "../../assets/popupDiscount.svg";
import { Link, useLocation } from "react-router-dom";

function Notice() {
  const [showNotice, setShowNotice] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const location = useLocation();

  // 공지사항을 닫습니다
  const handleHideNotice = () => {
    setShowNotice(false);
  };

  // 오늘 하루 팝업창을 가립니다
  const handleClickIgnore = () => {
    const now = new Date().getTime();
    localStorage.setItem("hideUntil", now + 24 * 60 * 60 * 1000);
    setShowNotice(false);
  };

  // 팝업 열기
  const handleShowPopup = () => {
    setShowPopup(true);
  };

  // 팝업 닫기
  const handleHidePopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    const hideUntil = localStorage.getItem("hideUntil");
    if (hideUntil) {
      const now = new Date().getTime();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0); // 자정 시각 설정
      if (now < hideUntil && now < midnight.getTime()) {
        setShowNotice(false);
      } else {
        localStorage.removeItem("hideUntil"); // 자정을 넘어가면 localStorage에서 hideUntil제거
      }
    }
  }, []);

  // "/admin" 산하의 페이지에는 Notice 컴포넌트를 렌더링하지 않음
  if (location.pathname.startsWith("/admin")) return null;

  return (
    <div
      className={`notice-bar ${showNotice ? "" : "hidden"}`}
      style={{ display: showNotice ? "block" : "none" }}
    >
      <button className="popup-btn" onClick={handleShowPopup}>
        <div>신규가입 시 10% 할인쿠폰 제공</div>
      </button>
      <div className="wrapper">
        <button className="ignore-btn" onClick={handleClickIgnore}>
          오늘 하루 보지 않기
        </button>
        <button className="close-btn" onClick={handleHideNotice}>
          X
        </button>
      </div>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            {/* content 상단 */}
            <img src={popupDiscount} alt="popupDiscount"></img>
            {/* content 중단 */}
            <div className="popup-text">
              <p>
                <span style={{ fontWeight: "bold" }}>
                  신규가입 시 10% 할인쿠폰 발급가능
                </span>
              </p>
              <br />
              <p>7/1 까지 신규가입하시는 모든분께 할인쿠폰을 드립니다.</p>
              <p>*일부 상품에는 적용이 불가합니다.</p>
            </div>

            {/* content 하단 */}
            <div className="popup-link-box">
              <button className="popup-link-btn">
                <Link to="/" onClick={handleHidePopup} className="popup-link">
                  자세히 보기
                </Link>
              </button>
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
