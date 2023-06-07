import React, { useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import Facebook from "../assets/login/facebook_logo.png";
import KakaoTalk from "../assets/login/kakaotalk_logo.png";
import Naver from "../assets/login/naver_logo.png";
import { AUTH_URL } from "../constants/Url";
import { getCookie } from "../utils/Cookies";
import { useDispatch } from "react-redux";
import { fetchTokenByLogin, fetchMemberByToken } from "../store/modules/login";

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
        <ImgButtonBox className="img-button-box button-box">
          <ImgButton
            className="facebook-login img-button"
            src={Facebook}
            alt=""
            onClick={() => handleSNSLogin(AUTH_URL.facebook)}
          />
          <ImgButton
            className="kakaotalk-login img-button"
            src={KakaoTalk}
            alt=""
            onClick={() => handleSNSLogin(AUTH_URL.kakao)}
          />
          <ImgButton
            className="naver-login img-button"
            src={Naver}
            alt=""
            onClick={() => handleSNSLogin(AUTH_URL.naver)}
          />
        </ImgButtonBox>
      </LoginArea>
    </LoginWrap>
  );
}

export default Login;

const LoginWrap = styled.div`
  width: 60vw;
  margin: 0px auto 120px;
  padding-top: 180px;
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
  // margin: 100px 0 50px 0;
  padding-left: 15%;
  padding-bottom: 10px;
`;

const InputBox = styled.div`
  margin: 20px auto;
  text-align: center;
  width: 50%;
`;

const Label = styled.label`
  text-align: left;
  display: block;
  padding-left: 15%;
  margin: 10px 0;
  font-size: 1rem;
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
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  width: 25%;
  margin: 0 auto;
  padding: 0;
  text-decoration: none;
`;

const ImgButton = styled.img`
  width: 50px;
  height: 50px;
  cursor: pointer;
  border-radius: 50%;
  margin-left: 3%;
  margin-right: 3%;
`;

const WarningText = styled.div`
  color: red;
`;
