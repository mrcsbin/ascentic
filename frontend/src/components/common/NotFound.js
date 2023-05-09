import React from "react";
import error from "../../assets/404error2.json";
import Lottie from "react-lottie";
import "../../styles/NotFound.css";
import { Link } from "react-router-dom";

const NotFound = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: error,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="error-container">
      <Lottie options={defaultOptions} height={300} width={300} />
      <p className="error-text">앗! 향의 늪에 빠져버렸군요! </p>
      <p className="error-text2">찾으시는 페이지가 없습니다 </p>
      <Link to="/">
        <button className="main-page-btn">메인 페이지로 이동하기</button>
      </Link>
    </div>
  );
};

export default NotFound;
