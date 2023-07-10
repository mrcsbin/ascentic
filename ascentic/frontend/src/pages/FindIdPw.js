import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import "../styles/FindIdPw.css";
import { findId, findPw, sendCode, checkCode } from "../api/MemberApi";
import Timer from "../components/common/Timer";
import { SIGNUP_ERROR_MESSAGE } from "../constants/Message";

function FindId() {
  const [actionMode, setActionMode] = useState(0);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
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
      setPhone("");
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
      } else {
        alert(SIGNUP_ERROR_MESSAGE.UNKNOWN);
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
    if (phone === "") {
      alert("전화번호를 입력해주세요");
      return false;
    }
    if (!codeOk) {
      alert("전화번호 인증을 완료해주세요");
    }
    const id = await findId(name, phone);
    setGetData(id);
    setActionMode(1);
  };

  const handleCheckTime = () => {
    alert(SIGNUP_ERROR_MESSAGE.PHONE_TIMEOVER);
    setShowCertificate(false);
    setCodeOk(false);
    setCode("");
  }; //Timer 시간 만료시 행동

  return actionMode === 0 ? (
    <div className="find-box">
      <div className="info-box">
        <h1>아이디 찾기</h1>
        <p>가입시 입력한 이름, 전화번호를 입력하세요</p>
      </div>
      <div className="input-box">
        <input
          type="text"
          name="name"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          name="phone"
          placeholder="전화번호"
          value={phone}
          disabled={showCertificate || codeOk}
          onChange={(e) => {
            if (e.target.value.length <= 11) {
              setPhone(e.target.value);
            }
          }}
        />
        <div className="button-box">
          <button
            className="check"
            onClick={() => getCode(phone)}
            disabled={showCertificate || phone.length < 11 || codeOk}
          >
            인증번호 받기
          </button>
        </div>
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
              <button className="check" onClick={() => check(phone, code)}>
                인증번호 확인하기
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="button-box">
        <button onClick={handleClick}>찾기</button>
      </div>
    </div>
  ) : (
    <div className="result">
      {getData === "" ? (
        <div>
          <h1></h1>
          <Link to="/login">
            <span>로그인 하러 가기</span>
          </Link>
        </div>
      ) : (
        <div>
          <h1>{getData}</h1>
          <Link to="/login">
            <span>로그인 하러 가기</span>
          </Link>
        </div>
      )}
    </div>
  );
}

function FindPassword() {
  const [actionMode, setActionMode] = useState(0);
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [phone, setPhone] = useState("");
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
      setPhone("");
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
      } else {
        alert(SIGNUP_ERROR_MESSAGE.UNKNOWN);
      }
      setCodeOk(false);
      setCode("");
    }
  };

  const handleCheckTime = () => {
    alert(SIGNUP_ERROR_MESSAGE.PHONE_TIMEOVER);
    setShowCertificate(false);
    setCodeOk(false);
    setCode("");
  }; //Timer 시간 만료시 행동

  const handleClick = async () => {
    if (name === "") {
      alert("이름을 입력하세요");
      return false;
    }
    if (id === "") {
      alert("아이디를 입력하세요");
      return false;
    }
    if (phone === "") {
      alert("전화번호를 입력해주세요");
      return false;
    }
    if (!codeOk) {
      alert("전화번호 인증을 완료해주세요");
    }

    const pw = await findPw(name, id, phone);
    setGetData(pw);
    setActionMode(1);
  };

  return actionMode === 0 ? (
    <div className="find-box">
      <div className="info-box">
        <h1>비밀번호 찾기</h1>
        <p>가입시 입력한 이름, 아이디, 전화번호를 입력하세요</p>
      </div>
      <div className="input-box">
        <input
          type="text"
          name="name"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          name="id"
          placeholder="아이디"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <input
          type="text"
          name="phone"
          placeholder="전화번호"
          value={phone}
          disabled={showCertificate || codeOk}
          onChange={(e) => {
            if (e.target.value.length <= 11) {
              setPhone(e.target.value);
            }
          }}
        />{" "}
        <div className="button-box">
          <button
            className="check"
            onClick={() => getCode(phone)}
            disabled={showCertificate || phone.length < 11 || codeOk}
          >
            인증번호 받기
          </button>
        </div>
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
              <button className="check" onClick={() => check(phone, code)}>
                인증번호 확인하기
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="button-box">
        <button onClick={handleClick}>찾기</button>
      </div>
    </div>
  ) : (
    <div className="result">
      {getData === "" ? (
        <div>
          <h1></h1>
          <Link to="/login">
            <span>로그인 하러 가기</span>
          </Link>
        </div>
      ) : (
        <div>
          <h1>{getData}</h1>
          <Link to="/login">
            <span>로그인 하러 가기</span>
          </Link>
        </div>
      )}
    </div>
  );
}

function FindIdPw() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.state.activeTab);

  const handleClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div id="find-wrap">
      <div className="find-tab">
        <div
          className={(activeTab === 0 ? "active" : "") + " find-id-tab"}
          onClick={() => handleClick(0)}
        >
          <span>아이디 찾기</span>
        </div>
        <div
          className={(activeTab === 1 ? "active" : "") + " find-pw-tab"}
          onClick={() => handleClick(1)}
        >
          <span>비밀번호 찾기</span>
        </div>
      </div>
      <div className="find-area">
        {activeTab === 0 && <FindId />}
        {activeTab === 1 && <FindPassword />}
      </div>
    </div>
  );
}

export default FindIdPw;
