import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Facebook from "../assets/facebook_logo.png";
import KakaoTalk from "../assets/kakaotalk_logo.png";
import Naver from "../assets/naver_logo.png";
import { AUTH_URL } from "../constants/Url";
import "../styles/Login.css";
import { getCookie } from "../utils/Cookies";
import { useDispatch } from "react-redux";
import { fetchTokenByLogin, fetchMemberByToken } from "../store/modules/login";

function Login() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const idInputRef = useRef(null);
  const pwInputRef = useRef(null);
  const [isIdEmpty, setIsIdEmpty] = useState(false);
  const [isPwEmpty, setIsPwEmpty] = useState(false);
  const dispatch = useDispatch();

  // 입력칸 비었는지 확인
  const checkInput = (data, ref, setIsEmpty) => {
    if (data === "") {
      ref.current.focus();
      setIsEmpty(true);
      return false;
    }
    setIsEmpty(false);
    return true;
  };

  // 로그인
  const handleClick = async () => {
    if (!checkInput(id, idInputRef, setIsIdEmpty)) {
      return;
    }
    if (!checkInput(password, pwInputRef, setIsPwEmpty)) {
      return;
    }
    await dispatch(fetchTokenByLogin({ id, password }));
    if (getCookie("accessToken")) {
      await dispatch(fetchMemberByToken()).then(() => {
        navigate("/", { replace: true });
      });
    } else {
      setId("");
      setPassword("");
      alert("틀렸수다");
    }
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

  // 엔터 입력시 로그인 버튼 클릭
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleClick();
    }
  };

  return (
    <LoginWrap id="login-wrap">
      <LoginArea className="login-area">
        <LoginHeaderBox className="login-box">
          <LoginHeader>로그인</LoginHeader>
        </LoginHeaderBox>
        <InputBox className="id-box input-box">
          <Label htmlFor="id">아이디</Label>
          <Input
            type="text"
            id="id"
            name="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
            onKeyDown={handleKeyPress}
            ref={idInputRef}
            isEmpty={setIsIdEmpty}
          />
          {isIdEmpty && <WarningText>아이디 입력하소</WarningText>}
        </InputBox>
        <InputBox className="password-box input-box">
          <Label htmlFor="pw">비밀번호</Label>
          <Input
            type="password"
            id="pw"
            name="pw"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyPress}
            ref={pwInputRef}
            isEmpty={setIsPwEmpty}
          />
          {isPwEmpty && <WarningText>비번 입력하소</WarningText>}
        </InputBox>
        <ButtonBox className="submit-button-box button-box">
          <Button
            className="submit-button button"
            type="button"
            onClick={() => handleClick()}
          >
            로그인
          </Button>
        </ButtonBox>
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
      </LoginArea>
    </LoginWrap>
  );
}

export default Login;

const LoginWrap = styled.div`
  width: 60%;
  margin: auto;
`;

const LoginArea = styled.div`
  width: 100%;
`;

const LoginHeaderBox = styled.div`
  width: 50%;
  margin: auto;
`;

const LoginHeader = styled.h1`
  font-size: 1.6rem;
  font-weight: bold;
  margin: 100px 0 50px 0;
  padding-left: 15%;
`;

const InputBox = styled.div`
  margin: 30px auto;
  text-align: center;
  width: 50%;
`;

const Label = styled.label`
  text-align: left;
  display: block;
  padding-left: 15%;
`;

const Input = styled.input`
  border: 1.5px solid;
  box-sizing: border-box;
  padding: 0;
  padding-left: 10px;
  width: 70%;
  height: 35px;
`;

const ButtonBox = styled.div`
  text-align: center;
  width: 50%;
  margin: auto;
`;

const Button = styled.button`
  cursor: pointer;
  padding: 0px;
  width: 70%;
  border: 0px;
  background-color: black;
  color: white;
  height: 40px;
  margin: 0 auto 30px auto;
`;

const WarningText = styled.div`
  color: red;
`;
