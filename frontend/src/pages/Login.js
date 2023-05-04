import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Login.css";
import axios from "axios";
import Facebook from "../assets/facebook_logo.png";
import KakaoTalk from "../assets/kakaotalk_logo.png";
import Naver from "../assets/naver_logo.png";
import { AUTH_URL } from "../constants/Url";

/**
 * 문의는 mrcsbin ~!@#~!@#@~!$#
 */

function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleClick();
    }
  };

  const handleClick = () => {
    if (id === "") {
      alert("아이디를 입력해주세요");
      return false;
    }
    if (password === "") {
      alert("비밀번호를 입력해주세요");
      return false;
    }
    const member = {
      id: id,
      password: password,
    };
    axios
      .post("http://localhost:8080/member/login", member)
      .then((response) => {
        if (response.data === "성공") {
          window.location.href = "/";
        } else {
          alert("없수다");
          setId("");
          setPassword("");
        }
      })
      .catch((e) => {
        alert("없수다");
        setId("");
        setPassword("");
      });
  };

  const handleSNSLogin = (url) => {
    if (url === "") {
      alert("아직 미구현이라능");
      return;
    }
    window.location.href = url;
    // const test = new URL(url);
    // const code = test.searchParams.get("code");
    // alert(code);
  };

  return (
    <div id="login-wrap">
      <div className="login-area">
        <div className="login-box">
          <h1>로그인</h1>
        </div>
        <div className="id-box input-box">
          <label htmlFor="id">아이디</label>
          <input
            type="text"
            id="id"
            name="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </div>
        <div className="password-box input-box">
          <label htmlFor="pw">비밀번호</label>
          <input
            type="password"
            id="pw"
            name="pw"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </div>
        <div className="submit-button-box button-box">
          <button
            className="submit-button button"
            type="button"
            onClick={handleClick}
          >
            로그인
          </button>
        </div>
        <div className="etc-button-box button-box">
          <Link to="/member/find" state={{ activeTab: 0 }}>
            <span> 아이디 찾기 </span>
          </Link>
          <span>&nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;</span>
          <Link to="/member/find" state={{ activeTab: 1 }}>
            <span> 비밀번호 찾기 </span>
          </Link>
          <span>&nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;</span>
          <Link to="/signup">
            <span> 회원가입 </span>
          </Link>
        </div>
        <div className="login-info-box">
          <span>SNS 계정으로 간편 로그인</span>
        </div>
        <div className="img-button-box button-box">
          <img
            className="facebook-login img-button"
            src={Facebook}
            alt=""
            onClick={() => handleSNSLogin(AUTH_URL.facebook)}
          />
          <img
            className="kakaotalk-login img-button"
            src={KakaoTalk}
            alt=""
            onClick={() => handleSNSLogin(AUTH_URL.kakao)}
          />
          <img
            className="naver-login img-button"
            src={Naver}
            alt=""
            onClick={() => handleSNSLogin(AUTH_URL.naver)}
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
