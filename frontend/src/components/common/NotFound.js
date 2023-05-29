import React from "react";
import error from "../../assets/404error2.json";
import Lottie from "react-lottie";
import "../../styles/NotFound.css";
import { Link, useNavigate } from "react-router-dom";

const NotFound = () => {
  const nav = useNavigate();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: error,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const linkToMainPage = () => {
    nav("/");
  };

  return (
    <div className="error-container">
      <Lottie options={defaultOptions} height={300} width={300} />
      <p className="error-text">앗! 향의 늪에 빠져버렸군요! </p>
      <p className="error-text2">찾으시는 페이지가 없습니다 </p>

      <button className="main-page-btn" onClick={linkToMainPage}>
        메인 페이지로 이동하기
      </button>
    </div>
  );
};

export default NotFound;
