import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

function FindPassword() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const idInputRef = useRef(null);
  const pwInputRef = useRef(null);


  const handleClick = async () => {};

  return (
    <LoginWrap id="login-wrap">
      <LoginArea className="login-area">
        <LoginHeaderBox className="login-box">
          <LoginHeader>아이디 찾기</LoginHeader>
        </LoginHeaderBox>
        <InputBox className="id-box input-box">
          <IdLabel htmlFor="id">아이디</IdLabel>
          <IdInput type="text" id="id" name="id" value={id} ref={idInputRef} />
        </InputBox>
        <ButtonBox className="submit-button-box button-box">
          <Button className="submit-button button" type="button">
            로그인
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
  font-size: 1.1rem;
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
  font-size: 1.1rem;
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
  background-color: ${(props) => (props.isCheck ? "black" : "grey")};
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
  display: block;
  position: absolute;
  line-height: 16px;
  font-size: 0.8rem;
  color: #f15746;
`;
