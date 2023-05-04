import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../assets/styles/login.css";
import Modal from "../components/login/Modal";

function LoginPage() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  const handleInputId = (e) => {
    setId(e.target.value);
  };
  const handleInputPw = (e) => {
    setPw(e.target.value);
  };
  const onClickJoin = () => {
    navigate("/signup");
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onClickLogin();
    }
  };

  //스프링 부트 연결 시(작동 확인)
  const onClickLogin = () => {
    if (id === "") {
      alert("아이디를 입력해주세요");
      return false;
    }
    if (pw === "") {
      alert("비밀번호를 입력해주세요");
      return false;
    }
    const user = {
      user_id: id,
      user_pwd: pw,
    };
    axios
      .post("http://localhost:8080/usercheck", user)
      .then((res) => {
        const { data } = res;
        if (data === 1) {
          window.sessionStorage.setItem("user_id", id);
          console.log(window.sessionStorage.getItem("user_id"));
          window.location.href = "/";
          // window.localStorage.setItem("token", data.token);
          // console.log(window.localStorage.getItem("token"));
          // navigate("/");
        } else {
          alert("존재하지 않는 아이디거나 비밀번호가 일치하지 않습니다");
          navigate("/login");
          setId("");
          setPw("");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div id="LoginWrap">
      <div className="LoginBg">
        <h3>회원 로그인</h3>
        <div className="contentsBox">
          <div className="LoginBox">
            <div className="inputBox">
              <input
                type="text"
                name="id"
                value={id}
                placeholder="아이디"
                onChange={handleInputId}
                onKeyPress={handleKeyPress}
              />{" "}
              <br />
              <input
                type="password"
                name="pw"
                value={pw}
                placeholder="비밀번호"
                onChange={handleInputPw}
                onKeyPress={handleKeyPress}
              />
            </div>
            <div>
              <button onClick={openModal} className="find">
                아이디 & 비밀번호 찾기
              </button>
              <Modal
                open={modalOpen}
                close={closeModal}
                header="아이디 & 비밀번호찾기"
              />
            </div>
            <button
              id="login"
              type="button"
              onClick={onClickLogin}
              className="btnLogin btnMember"
            >
              로그인
            </button>
          </div>
          <div className="Joinbox">
            <div className="joinText">아직 회원이 아니신가요?</div>
            <button
              type="button"
              onClick={onClickJoin}
              className="btnJoin btnMember"
            >
              회원가입
            </button>
          </div>
        </div>
        <div className="Custom">
          <span>고객센터 1544-1544</span>
          <span>평일: 09:00 ~ 18:00</span>
        </div>
      </div>
    </div>
  );
}
export default LoginPage;
