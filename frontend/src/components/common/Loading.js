import React from "react";
import "../../styles/Loading.css";
import { Link } from "react-router-dom";
import Lottie from "react-lottie";
import loading from "../../assets/loading.json";
function Loading() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loading,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="loading-container">
      <Lottie options={defaultOptions} height={400} width={450} />

      <Link to="/">
        <button className="main-page-btn">메인 페이지로 이동하기</button>
      </Link>
    </div>
  );
}

export default Loading;
