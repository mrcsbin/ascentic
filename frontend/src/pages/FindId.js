import React, { useRef, useState } from "react";
import styled from "styled-components";
import { findId, findPw, sendCode, checkCode } from "../api/MemberApi";
import Timer from "../components/common/Timer";
import { SIGNUP_ERROR_MESSAGE } from "../constants/Message";

function FindId() {
  const [tel, setTel] = useState("");
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [getData, setGetData] = useState("");
  const [showCertificate, setShowCertificate] = useState(false);
  const [codeOk, setCodeOk] = useState(false);

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
      alert("인증이 완료되었습니다!");
      setCodeOk(true);
      setShowCertificate(false);
    } else {
      if (res === "Wrong") {
        alert(SIGNUP_ERROR_MESSAGE.PHONE_CERTIFICATE_WRONG);
      } else if (res === "Ok") {
        alert(SIGNUP_ERROR_MESSAGE.NO_SUCH_PHONE);
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

  const handleClick = async () => {
    if (name === "") {
      alert("이름을 입력해주세요");
      return false;
    }
    if (tel === "") {
      alert("전화번호를 입력해주세요");
      return false;
    }
    if (!codeOk) {
      alert("전화번호 인증을 완료해주세요");
    }
    const id = await findId(name, tel);
    setGetData(id);
  };

  const handleCheckTime = () => {
    alert(SIGNUP_ERROR_MESSAGE.PHONE_TIMEOVER);
    setShowCertificate(false);
    setCodeOk(false);
    setCode("");
    setTel("");
  }; //Timer 시간 만료시 행동
  return (
    <LoginWrap id="login-wrap">
      <LoginArea className="login-area">
        <LoginHeaderBox className="login-box">
          <LoginHeader>아이디 찾기</LoginHeader>
        </LoginHeaderBox>
        <InfoText>
          가입 시 등록한 휴대폰 번호를 입력후
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
            disabled={showCertificate || codeOk}
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
          <div className="certificateCode-box">
            <br />
            <div className="timer">
              <Timer
                timerActive={showCertificate}
                onCheckTime={handleCheckTime}
              />
            </div>
            <input
              type="text"
              name="code"
              placeholder="인증번호"
              value={code}
              disabled={false}
              onChange={(e) => setCode(e.target.value)}
            />
            <div className="button-box">
              <button className="check" onClick={() => check(tel, code)}>
                인증번호 확인하기
              </button>
            </div>
          </div>
        )}
      </LoginArea>
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
  margin: 3rem auto;
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
