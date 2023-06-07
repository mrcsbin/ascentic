import React, { useRef, useState } from "react";
import styled from "styled-components";
import { findId, findPw, sendCode, checkCode } from "../api/MemberApi";
import Timer from "../components/common/Timer";
import { SIGNUP_ERROR_MESSAGE } from "../constants/Message";
import { Link } from "react-router-dom";

function FindId() {
  const [tel, setTel] = useState("");
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [getData, setGetData] = useState("");
  const [showCertificate, setShowCertificate] = useState(false);
  const [codeOk, setCodeOk] = useState(false);
  const [isCodeCheck, setIsCodeCheck] = useState(true);
  const [isFinalCheck, setIsFinalCheck] = useState(false);
  const [findId, setFindId] = useState("");

  const getCode = async (phone) => {
    const res = await sendCode(phone);
    console.log(res);
    if (res) {
      setShowCertificate(true);
    } else {
      setShowCertificate(false);
      setTel("");
    }
  };

  const check = async (phone, code) => {
    const res = await checkCode(phone, code);
    if (res === "duplicateNum") {
      setCodeOk(true);
      setShowCertificate(false);
      setIsFinalCheck(true);
      console.log(res);
    } else {
      if (res === "Wrong") {
        setIsCodeCheck(false);
      } else if (res === "Ok") {
        alert("문자가 발송되었습니다.");
        setShowCertificate(false);
        setCodeOk(false);
        setTel("");
      } else {
        alert(SIGNUP_ERROR_MESSAGE.UNKNOWN);
        setShowCertificate(false);
        setCodeOk(false);
        setTel("");
      }
      setCodeOk(false);
      setCode("");
    }
  };

  const handleCheckTime = () => {
    window.location.reload();
  }; //Timer 시간 만료시 행동

  return (
    <LoginWrap id="login-wrap">
      {!isFinalCheck ? (
        <LoginArea className="login-area">
          <LoginHeaderBox className="login-box">
            <LoginHeader>아이디 찾기</LoginHeader>
          </LoginHeaderBox>
          <InfoText>
            가입 시 등록한 이름과 휴대폰 번호를 입력후
            <br />
            <br /> 인증받기를 통해 아이디를 알려드립니다.
          </InfoText>
          <InputBox className="id-box input-box">
            <IdLabel htmlFor="name">이름</IdLabel>
            <IdInput
              type="text"
              id="name"
              name="name"
              value={name}
              disabled={showCertificate}
              placeholder="회원 이름"
              onChange={(e) => setName(e.target.value)}
            />
          </InputBox>
          <InputBox className="id-box input-box">
            <IdLabel htmlFor="tel">전화번호</IdLabel>
            <IdInput
              type="text"
              id="tel"
              name="tel"
              value={tel}
              disabled={showCertificate}
              placeholder="가입할 때 입력한 휴대전화 번호"
              onChange={(e) => setTel(e.target.value)}
              onInput={(e) => {
                e.target.value = e.target.value
                  .replace(/[^0-9.]/g, "")
                  .replace(/(\..*)\./g, "$1");
              }}
            />
          </InputBox>
          <ButtonBox className="submit-button-box button-box">
            <Button
              isCheck={name && tel.length === 11}
              disabled={showCertificate || tel.length < 11 || codeOk}
              onClick={() => getCode(tel)}
              type="button"
            >
              문자 발송
            </Button>
          </ButtonBox>
          {showCertificate && (
            <CertificateWrap>
              <CertificateBox>
                <CertificateInput
                  type="text"
                  name="code"
                  placeholder="인증번호"
                  value={code}
                  disabled={false}
                  onChange={(e) => setCode(e.target.value)}
                  isCheck={isCodeCheck}
                />
                <TimerBox>
                  <Timer
                    timerActive={showCertificate}
                    onCheckTime={handleCheckTime}
                  />
                </TimerBox>
                {!isCodeCheck && (
                  <WarningText>틀렸습니다. 다시 확인해주세요.</WarningText>
                )}
              </CertificateBox>
              <CertificateButtonBox className="button-box">
                <CertificateButton
                  className="check"
                  onClick={() => check(tel, code)}
                >
                  인증하기
                </CertificateButton>
              </CertificateButtonBox>
            </CertificateWrap>
          )}
        </LoginArea>
      ) : (
        <LoginArea>
          <LoginHeaderBox className="login-box">
            <LoginHeader>아이디 찾기 성공</LoginHeader>
          </LoginHeaderBox>
          <SuccessBox>
            <SuccessTitle>아이디</SuccessTitle>
            <Id>mrcsbin</Id>
          </SuccessBox>
          <SuccessButtonBox>
            <GoToLoginButton to="/login">로그인</GoToLoginButton>
            <GoToFindPwButton to="/login/find_password">
              비밀번호 찾기
            </GoToFindPwButton>
          </SuccessButtonBox>
        </LoginArea>
      )}
    </LoginWrap>
  );
}

export default FindId;

const LoginWrap = styled.div`
  width: 70%;
  margin: 0 auto;
  padding-top: 200px;
`;

const LoginArea = styled.div`
  width: 100%;
`;

const LoginHeaderBox = styled.div`
  width: 35%;
  margin: auto;
  border-bottom: 2px solid black;
`;

const InfoText = styled.div`
  width: 35%;
  font-size: 1rem;
  color: grey;
  margin: 2rem auto 3rem auto;
`;

const LoginHeader = styled.h1`
  text-align: center;
  font-size: 1.6rem;
  font-weight: bold;
  // margin: 100px 0 50px 0;
  margin-bottom: 40px;
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
`;

const IdInput = styled.input`
  padding: 11px 0px;
  width: 100%;
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
  margin: 2rem auto 1rem auto;
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
  font-size: 1rem;
  font-weight: 500;
`;

const CertificateWrap = styled.div`
  width: 35%;
  margin: 0 auto;
  display: flex;
`;

const CertificateBox = styled.div`
  display: flex;
  width: 70%;
  position: relative;
  padding: 0 0 15px 0;
`;

const TimerBox = styled.div`
  padding: 10px 11px;
  width: 20%;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
`;

const CertificateInput = styled.input`
  width: 80%;
  padding: 10px 11px;
  box-sizing: border-box;
  font-size: 1.2rem;
  border: none;
  border-bottom: ${(props) =>
    props.isCheck ? "1px solid black" : "1px solid red"};
  outline: none;
  :focus {
    border-bottom: ${(props) =>
      props.isCheck ? "2px solid black" : "2px solid red"};
  }
`;

const CertificateButtonBox = styled.div`
  padding: 0 0 15px 0;
  width: 30%;
  display: flex;
  justify-content: center;
  align-items: end;
  flex-direction: column;
`;

const CertificateButton = styled.div`
  color: rgba(34, 34, 34, 0.5);
  font-size: 1rem;
  border: 1px solid rgba(34, 34, 34, 0.5);
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
`;

const WarningText = styled.div`
  position: absolute;
  bottom: 0;
  color: red;
  font-size: 0.8rem;
`;

const SuccessBox = styled.div`
  width: 35%;
  margin: 2rem auto;
  text-align: center;
`;

const SuccessTitle = styled.div`
  padding-bottom: 1rem;
  font-size: 0.9rem;
  color: grey;
`;

const Id = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
`;

const SuccessButtonBox = styled.div`
  padding-top: 4px;
  width: 35%;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
`;

const GoToLoginButton = styled(Link)`
  width: 40%;
  text-align: center;
  /* flex: 1 1 0%; */
  height: 52px;
  line-height: 52px;
  border-radius: 12px;
  padding: 0px 25px;
  border: 1px solid rgb(211, 211, 211);
  cursor: pointer;
  box-sizing: border-box;
  color: black;
  text-decoration: none;
  :hover {
    color: white;
    background-color: black;
  }
`;

const GoToFindPwButton = styled(Link)`
  width: 40%;
  text-align: center;
  /* flex: 1 1 0%; */
  height: 52px;
  line-height: 52px;
  border-radius: 12px;
  padding: 0px 25px;
  border: 1px solid rgb(211, 211, 211);
  cursor: pointer;
  box-sizing: border-box;
  color: black;
  text-decoration: none;
  :hover {
    color: white;
    background-color: black;
  }
`;
