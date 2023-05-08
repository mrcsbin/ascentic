import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import "../styles/FindIdPw.css";
import { findId, findPw } from "../api/MemberApi";

/**
 * 문의는 mrcsbin !@#!@#!@#@!#@!#!@
 */

function FindId() {
  const [actionMode, setActionMode] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [getData, setGetData] = useState("");

  const handleClick = async () => {
    if (name === "") {
      alert("이름을 입력해주세요");
      return false;
    }
    if (email === "") {
      alert("이메일을 입력해주세요");
      return false;
    }

    const id = await findId(name, email);
    setGetData(id);
    setActionMode(1);
  };

  return actionMode === 0 ? (
    <div className="find-box">
      <div className="info-box">
        <h1>아이디 찾기</h1>
        <p>가입시 입력한 이름, 이메일을 입력하세요</p>
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
          name="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
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
  const [email, setEmail] = useState("");
  const [getData, setGetData] = useState("");

  const handleClick = async () => {
    if (name === "") {
      alert("이름을 입력하세요");
      return false;
    }
    if (id === "") {
      alert("아이디를 입력하세요");
      return false;
    }
    if (email === "") {
      alert("이메일을 입력하세요");
      return false;
    }

    const pw = await findPw(name, id, email);
    setGetData(pw);
    setActionMode(1);
  };

  return actionMode === 0 ? (
    <div className="find-box">
      <div className="info-box">
        <h1>비밀번호 찾기</h1>
        <p>가입시 입력한 이름, 아이디, 이메일을 입력하세요</p>
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
          name="email"
          value={email}
          placeholder="이메일"
          onChange={(e) => setEmail(e.target.value)}
        />
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
