import React, { useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import Facebook from "../assets/login/facebook_logo.png";
import Naver from "../assets/login/naver_logo.png";
import { AUTH_URL } from "../constants/Url";
import { getCookie } from "../utils/Cookies";
import { useDispatch } from "react-redux";
import { fetchTokenByLogin, fetchMemberByToken } from "../store/modules/login";
import KakaoTalk from "../assets/kakao.png";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
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

    // 로그인 정보로 토큰 생성
    await dispatch(fetchTokenByLogin({ id, password }));
    if (getCookie("accessToken")) {
      await dispatch(fetchMemberByToken()).then(() => {
        if (location.state) {
          navigate(location.state.pathname, {
            state: { taste: location.state.taste, option: 7 },
          });
        } else {
          navigate("/", { replace: true });
          window.location.reload();
        }
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
        <TextButtonBox className="etc-button-box button-box">
          <LoginLink to="/member/find" state={{ activeTab: 0 }}>
            아이디 찾기
          </LoginLink>
          <span>|</span>
          <LoginLink to="/member/find" state={{ activeTab: 1 }}>
            비밀번호 찾기
          </LoginLink>
          <span>|</span>
          <LoginLink to="/signup">회원가입</LoginLink>
        </TextButtonBox>
        <InfoBox className="login-info-box">SNS 계정으로 간편 로그인</InfoBox>
        <ImgButtonBox
          className="img-button-box button-box"
          onClick={() => handleSNSLogin(AUTH_URL.kakao)}
        >
          <div>
            <ImgButton
              className="kakaotalk-login img-button"
              src={KakaoTalk}
              alt=""
            />
            <ImgButtonText>카카오로 로그인</ImgButtonText>
          </div>
        </ImgButtonBox>
      </LoginArea>
    </LoginWrap>
  );
}

export default Login;

const LoginWrap = styled.div`
  width: 70%;
  margin: 0 auto;
  padding-top: 200px;
`;

const LoginArea = styled.div`
  width: 100%;
`;

const LoginHeaderBox = styled.div`
  width: 50%;
  margin: auto;
`;

const LoginHeader = styled.h1`
  text-align: center;
  font-size: 1.6rem;
  font-weight: bold;
  // margin: 100px 0 50px 0;
  margin-bottom: 60px;
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
  margin: 10px 0;
  font-size: 1rem;
  font-weight: 600;
`;

const Input = styled.input`
  padding: 11px 0px;
  width: 70%;
  height: 40px;
  font-size: 1.1rem;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid black;
  outline: none;
  :focus {
    border-bottom: 2px solid black;
  }
`;

const ButtonBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  width: 50%;
  margin: 20px auto;
  padding: 0;
`;

const Button = styled.button`
  cursor: pointer;
  padding: 1rem;
  width: 70%;
  border: 0px;
  background-color: black;
  color: white;
  margin: 10px auto;
  font-size: 1rem;
  font-weight: 500;
`;

const TextButtonBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  width: 30%;
  margin: 0 auto;
  padding: 0;
  text-decoration: none;
`;

const LoginLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

const InfoBox = styled.div`
  margin: 30px auto 20px auto;
  text-align: center;
  width: 50%;
`;

const ImgButtonBox = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  -webkit-box-pack: justify;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  text-align: center;
  width: 50%;
  margin: 20px auto;
  padding: 0px;
  text-decoration: none;
  > div {
    display: flex;
    width: 70%;
    font-size: 1.1rem;
    box-sizing: border-box;
    font-weight: 700;
    height: 52px;
    border-radius: 12px;
    border: 1px solid grey;
  }
`;

const ImgButton = styled.img`
  padding-left: 10px;
  width: 50px;
  height: 50px;
  position: absolute;
`;

const ImgButtonText = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 50px;
`;

const WarningText = styled.div`
  color: red;
`;
