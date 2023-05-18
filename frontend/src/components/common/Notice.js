import React, { useState, useEffect } from "react";
import "../../styles/Notice.css";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

function Notice() {
  const [showNotice, setShowNotice] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [postData, setPostData] = useState(null);

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
    const fetchLatestEventPost = async () => {
      try {
        const response = await axios.get("/admin/getevent");
        const latestPost = response.data;
        setPostData(latestPost);
      } catch (error) {
        console.error("Error fetching latest event post:", error);
      }
    };

    fetchLatestEventPost();
  }, []);

  // "/admin" 산하의 페이지에는 Notice 컴포넌트를 렌더링하지 않음
  if (location.pathname.startsWith("/admin")) return null;

  return (
    <div
      className={`notice-bar ${showNotice ? "" : "hidden"}`}
      style={{ display: showNotice ? "block" : "none" }}
    >
      <button className="popup-btn" onClick={handleShowPopup}>
        <div>{postData?.postTitle}</div>
      </button>
      <div className="wrapper">
        <button className="ignore-btn" onClick={handleClickIgnore}>
          오늘 하루 보지 않기
        </button>
        <button className="close-btn" onClick={handleHideNotice}>
          X
        </button>
      </div>

      {showPopup && postData && (
        <div className="popup">
          <div className="popup-content">
            <img
              src={`http://localhost:8080/admin/download?img=${postData.postImage}`}
              className="popupImage"
              alt="popupDiscount"
            />
            <div className="popup-text">
              <p>
                <span style={{ fontWeight: "bold" }}>{postData.postTitle}</span>
              </p>
              <br />
              <div>
                <p>
                  {postData.postCoreMessage.split(".").slice(0, 1).join(".") +
                    "."}
                </p>

                <p>
                  {postData.postCoreMessage.split(".").slice(1, 2).join(".")}
                </p>
              </div>
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
