import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import Facebook from "../assets/login/facebook_logo.png";
import Naver from "../assets/login/naver_logo.png";
import { AUTH_URL } from "../constants/Url";
import { getCookie } from "../utils/Cookies";
import { useDispatch } from "react-redux";
import { fetchTokenByLogin, fetchMemberByToken } from "../store/modules/login";
import KakaoTalk from "../assets/kakao.png";
import { validateLoginPassword } from "../constants/Validation";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const idInputRef = useRef(null);
  const pwInputRef = useRef(null);
  const [isIdCheck, setIsIdCheck] = useState(true);
  const [isPwCheck, setIsPwCheck] = useState(true);
  const [isCheck, setIsCheck] = useState(true);
  const dispatch = useDispatch();

  const IdChangeHandle = (e) => {
    setId(e.target.value);
    if (id.length >= 4) {
      setIsIdCheck(true);
    } else {
      setIsIdCheck(false);
    }
  };

  const PwChangeHandle = (e) => {
    setPassword(e.target.value);
    if (!validateLoginPassword(e.target.value)) {
      setIsPwCheck(false);
    } else {
      setIsPwCheck(true);
    }
  };

  useEffect(() => {
    if (isIdCheck && isPwCheck) {
      if (password.length > 2) setIsCheck(true);
    } else {
      setIsCheck(false);
    }
  }, [isIdCheck, isPwCheck]);

  // 로그인
  const handleClick = async () => {
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
      alert("아이디 혹은 비밀번호가 틀렸습니다.");
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
          <IdLabel htmlFor="id" isIdCheck={isIdCheck}>
            아이디
          </IdLabel>
          <IdInput
            type="text"
            id="id"
            name="id"
            value={id}
            isIdCheck={isIdCheck}
            onChange={(e) => IdChangeHandle(e)}
            onKeyDown={handleKeyPress}
            ref={idInputRef}
            autocomplete="off"
          />
          {!isIdCheck && (
            <WarningText>
              영문, 숫자를 조합하여 입력해주세요. (5자 이상)
            </WarningText>
          )}
        </InputBox>
        <InputBox className="password-box input-box">
          <PwLabel htmlFor="pw" isPwCheck={isPwCheck}>
            비밀번호
          </PwLabel>
          <PwInput
            type="password"
            id="pw"
            name="pw"
            value={password}
            isPwCheck={isPwCheck}
            onChange={(e) => PwChangeHandle(e)}
            onKeyDown={handleKeyPress}
            ref={pwInputRef}
            autocomplete="off"
          />

          {!isPwCheck && (
            <WarningText>
              영문, 숫자, 특수문자를 조합해서 입력해주세요. (8자 이상)
            </WarningText>
          )}
        </InputBox>
        <ButtonBox className="submit-button-box button-box">
          <Button
            className="submit-button button"
            type="button"
            onClick={
              isCheck && id && password ? () => handleClick() : undefined
            }
            isCheck={isCheck}
          >
            로그인
          </Button>
        </ButtonBox>
        <TextButtonBox className="etc-button-box button-box">
          <LoginLink to="/login/find_id" state={{ activeTab: 0 }}>
            아이디 찾기
          </LoginLink>
          <span style={{ cursor: "default" }}>|</span>
          <LoginLink to="/login/find_password" state={{ activeTab: 1 }}>
            비밀번호 찾기
          </LoginLink>
          <span style={{ cursor: "default" }}>|</span>
          <LoginLink to="/signup">회원가입</LoginLink>
        </TextButtonBox>
        <InfoBox className="login-info-box">SNS 계정으로 간편 로그인</InfoBox>
        <ImgButtonBox
          className="img-button-box button-box"
          onClick={() => handleSNSLogin(AUTH_URL.kakao)}
        >
          <div>
            <ImgButtonText>카카오로 로그인</ImgButtonText>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <ImgButton
                className="kakaotalk-login img-button"
                src={KakaoTalk}
                alt=""
              />
            </div>
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
  width: 35%;
`;

const IdLabel = styled.label`
  text-align: left;
  display: block;
  margin: 10px 0px;
  font-size: 1rem;
  font-weight: 600;
  color: ${(props) => !props.isIdCheck && "red"};
`;

const PwLabel = styled.label`
  text-align: left;
  display: block;
  margin: 10px 0px;
  font-size: 1rem;
  font-weight: 600;
  color: ${(props) => !props.isPwCheck && "red"};
`;

const IdInput = styled.input`
  padding: 11px 0px;
  width: 100%;
  height: 40px;
  font-size: 1.2rem;
  box-sizing: border-box;
  border: none;
  border-bottom: ${(props) =>
    !props.isIdCheck ? "1px solid red" : "1px solid black"};
  outline: none;
  :focus {
    border-bottom: ${(props) =>
      !props.isIdCheck ? "2px solid red" : "2px solid black"};
  }
`;

const PwInput = styled.input`
  padding: 11px 0px;
  width: 100%;
  height: 40px;
  font-size: 1.2rem;
  box-sizing: border-box;
  border: none;
  border-bottom: ${(props) =>
    !props.isPwCheck ? "1px solid red" : "1px solid black"};
  outline: none;
  :focus {
    border-bottom: ${(props) =>
      !props.isPwCheck ? "2px solid red" : "2px solid black"};
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
  cursor: ${(props) => (props.isCheck ? "pointer" : "default")};
  padding: 1rem;
  width: 70%;
  border: 0px;
  background-color: ${(props) => (props.isCheck ? "black" : "lightgrey")};
  color: white;
  margin: 10px auto;
  font-size: 1.2rem;
  font-weight: 500;
  box-sizing: border-box;
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
  width: 35%;
  margin: 20px auto;
  padding: 0px;
  text-decoration: none;
  > div {
    display: flex;
    width: 100%;
    font-size: 1.1rem;
    box-sizing: border-box;
    font-weight: 700;
    height: 52px;
    border-radius: 12px;
    border: 1px solid grey;
    justify-content: center;
  }
`;

const ImgButton = styled.img`
  padding-left: 10px;
  width: 35px;
  height: 35px;
`;

const ImgButtonText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 50px;
`;

const WarningText = styled.div`
  display: block;
  position: absolute;
  line-height: 16px;
  font-size: 0.8rem;
  color: #f15746;
`;
