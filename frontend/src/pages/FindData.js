import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import "../styles/FindData.css";

/**
 * 문의는 mrcsbin !@#!@#!@#@!#@!#!@
 */

function FindId() {
  const [actionMode, setActionMode] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [getData, setGetData] = useState("");

  const handleClick = () => {
    if (name === "") {
      alert("이름을 입력해주세요");
      return false;
    }
    if (email === "") {
      alert("이메일을 입력해주세요");
      return false;
    }
    const findIdData = {
      name: name,
      email: email,
    };

    axios
      .post("http://localhost:8080/member/find/id", findIdData)
      .then((response) => {
        setGetData(response.data);
      });
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
        <h1>"찾으시는 정보가 없습니다."</h1>
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

  const handleClick = () => {
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
    const findPwData = {
      name: name,
      id: id,
      email: email,
    };
    axios
      .post("http://localhost:8080/member/find/pw", findPwData)
      .then((response) => {
        setGetData(response.data);
      });
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
        <h1>"찾으시는 정보가 없습니다."</h1>
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

function FindData() {
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

export default FindData;
