import React, { useState } from "react";
import styled from "styled-components";
import { validateFindPasswordByEmail } from "../constants/Validation";
import { findPw } from "../api/MemberApi";

function FindPassword() {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isRequestPending, setIsRequestPending] = useState(false); // 요청 대기 상태를 나타내는 상태값

  const handleClick = async (e) => {
    console.log("기릿");
    e.preventDefault();
    if (isRequestPending) {
      // 요청이 대기 중인 경우
      alert("잠시 기다려주세요");
      return; // 요청 무시
    }
    if (email === "") {
      alert("이메일을 입력하세요");
      return;
    }
    if (phone === "") {
      alert("전화번호를 입력해주세요");
      return;
    }
    setIsRequestPending(true); // 요청 대기 상태로 설정
    try {
      const message = await findPw(email, phone);
      alert(message);
      if (message == "찾으시는 정보가 없습니다") {
        setEmail("");
        setPhone("");
      }
    } catch (e) {
      alert(e);
    } finally {
      setIsRequestPending(false); // 요청 상태 초기화
    }
  };
  return (
    <LoginWrap id="login-wrap">
      <LoginArea className="login-area">
        <LoginHeaderBox className="login-box">
          <LoginHeader>비밀번호 찾기</LoginHeader>
        </LoginHeaderBox>
        <InfoText>
          가입 시 등록한 휴대폰 번호와 이메일을 입력후
          <br />
          <br /> 이메일로 임시 비밀번호를 보내드립니다.
        </InfoText>
        <InputBox className="id-box input-box">
          <IdLabel htmlFor="tel">휴대폰 번호</IdLabel>
          <IdInput
            type="text"
            id="tel"
            name="tel"
            value={phone}
            placeholder="전화번호"
            onChange={(e) => setPhone(e.target.value)}
            onInput={(e) => {
              e.target.value = e.target.value
                .replace(/[^0-9.]/g, "")
                .replace(/(\..*)\./g, "$1");
            }}
          />
        </InputBox>
        <InputBox className="id-box input-box">
          <IdLabel htmlFor="tel">이메일 주소</IdLabel>
          <IdInput
            type="text"
            id="email"
            name="email"
            value={email}
            placeholder="예) ascentic@ascentic.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputBox>
        <ButtonBox className="submit-button-box button-box">
          <Button
            isCheck={phone.length === 11 && validateFindPasswordByEmail(email)}
            type="button"
            onClick={(e) => handleClick(e)}
          >
            이메일 발송
          </Button>
        </ButtonBox>
      </LoginArea>
    </LoginWrap>
  );
}

export default FindPassword;

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
