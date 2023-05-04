import "../styles/SignUp.css";
import React, { useState, useEffect } from "react";
import "../styles/SignUp.css";
import axios from "axios";
import Correct from "../assets/correct.png";
import Wrong from "../assets/wrong.png";
import { validateForm } from "../constants/Validation";
import { SIGNUP_ERROR_MESSAGE } from "../constants/Message";
import { checkCode, sendCode } from "../constants/PhoneCertification";

function SignUp() {
  const [showCertificate, setShowCertificate] = useState(false);
  const [emailDuplicateStatus, setEmailDuplicateStatus] = useState(0);
  const [idDuplicateStatus, setIdDuplicateStatus] = useState(0);
  const [certificateCode, setCertificateCode] = useState("");

  const [formData, setFormData] = useState({
    id: "",
    password: "",
    confirmPassword: "",
    name: "",
    email: "",
    phone: "",
    infoAgree: false,
    snsPush: false,
    emailPush: false,
  });

  const [errors, setErrors] = useState({
    idError: false,
    passwordError: false,
    confirmPasswordError: false,
    nameError: false,
    emailError: false,
    phoneError: false,
    infoAgreeError: false,
  });

  const handleCertificateCode = (e) => {
    setCertificateCode(e.target.value);
  };

  function handlePhoneCertificate() {
    sendCode(formData.phone);
    setShowCertificate(true);
  }

  function handlePhoneCertificate2() {
    console.log(certificateCode);
    checkCode(formData.phone, certificateCode);
  }

  function handleEmailCheck() {
    axios
      .get(`/member/emailDuplicate/${formData.email}`)
      .then((res) => {
        console.log(res);
        if (res.data === false) {
          setEmailDuplicateStatus(1);
        } else {
          setEmailDuplicateStatus(2);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function handleIdCheck() {
    axios
      .get(`/member/idDuplicate/${formData.id}`)
      .then((res) => {
        console.log(res);
        if (res.data === false) {
          setIdDuplicateStatus(1);
        } else {
          setIdDuplicateStatus(2);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  useEffect(() => {
    const formErrors = validateForm(formData);
    setErrors(formErrors);
    console.log(formErrors);
  }, [formData]);

  function handleInputChange(e) {
    const { id, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prevFormData) => ({ ...prevFormData, [id]: checked }));
    } else {
      setFormData((prevFormData) => ({ ...prevFormData, [id]: value }));
    }

    setEmailDuplicateStatus(0);
    setIdDuplicateStatus(0);
  }

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post("/member/insert", formData)
      .then((res) => {
        console.log(formData);
        console.log(res.data);
      })
      .catch((e) => {
        console.log(formData);
        console.error(e);
      });
  }

  function goLogin() {
    window.location.href = "/login";
  }

  return (
    <div className="signupFrm">
      <form action="submit" className="form">
        <h1 className="title">회원가입</h1>
        <div className="inputContainer">
          <input
            type="text"
            className="input"
            id="id"
            placeholder="a"
            onChange={handleInputChange}
          />
          <label htmlFor="id" className="label">
            아이디
          </label>
          {!errors.idError && formData.id && (
            <button
              id="verifyBtn"
              onClick={(e) => {
                e.preventDefault();
                handleIdCheck();
              }}
            >
              중복확인
            </button>
          )}
          {idDuplicateStatus === 1 && (
            <img className="verify-correct" src={Correct} alt="" />
          )}
          {idDuplicateStatus === 2 && (
            <img className="verify-correct" src={Wrong} alt="" />
          )}
        </div>
        {errors.idError && (
          <div className="error">{SIGNUP_ERROR_MESSAGE.ID}</div>
        )}
        <div className="inputContainer">
          <input
            id="password"
            type="password"
            className="input"
            placeholder="a"
            onChange={handleInputChange}
          />
          <label htmlFor="password" className="label">
            비밀번호
          </label>
        </div>
        {errors.passwordError && (
          <span className="error">{SIGNUP_ERROR_MESSAGE.PW}</span>
        )}
        <div className="inputContainer">
          <input
            id="confirmPassword"
            type="password"
            className="input"
            placeholder="a"
            onChange={handleInputChange}
          />
          <label htmlFor="confirmPassword" className="label">
            비밀번호 확인
          </label>
        </div>
        {errors.confirmPasswordError && (
          <span className="error">{SIGNUP_ERROR_MESSAGE.CONFIRMPW}</span>
        )}
        <div className="inputContainer">
          <input
            id="name"
            type="text"
            className="input"
            placeholder="a"
            onChange={handleInputChange}
          />
          <label htmlFor="name" className="label">
            이름
          </label>
        </div>
        {errors.nameError && (
          <div className="error">{SIGNUP_ERROR_MESSAGE.NAME}</div>
        )}
        <div className="inputContainer">
          <input
            id="phone"
            type="text"
            className="input"
            placeholder="a"
            onChange={handleInputChange}
          />
          <label htmlFor="phone" className="label">
            전화번호
          </label>
          {!errors.phoneError && formData.phone && (
            <button
              id="verifyBtn"
              onClick={(e) => {
                handlePhoneCertificate();
                handleIdCheck();
              }}
            >
              인증하기
            </button>
          )}
        </div>

        {showCertificate && (
          <div className="inputContainer">
            <input
              id="certificateCode"
              type="text"
              className="input"
              placeholder="a"
              onChange={handleCertificateCode}
            ></input>
            <button
              id="certificateVerify"
              onClick={(e) => {
                e.preventDefault();
                handlePhoneCertificate2();
              }}
            >
              검증
            </button>
            {errors.phoneError && (
              <div className="error">{SIGNUP_ERROR_MESSAGE.PHONE}</div>
            )}
          </div>
        )}
        <div className="inputContainer">
          <div>
            <input
              id="email"
              type="text"
              className="input"
              placeholder="a"
              onChange={handleInputChange}
            />
            <label htmlFor="email" className="label">
              이메일
            </label>
            {!errors.emailError && formData.email && (
              <button
                id="verifyBtn"
                onClick={(e) => {
                  e.preventDefault();
                  handleEmailCheck();
                }}
              >
                중복확인
              </button>
            )}
          </div>
          {emailDuplicateStatus === 1 && (
            <img className="verify-correct" src={Correct} alt="" />
          )}
          {emailDuplicateStatus === 2 && (
            <img className="verify-correct" src={Wrong} alt="" />
          )}
        </div>
        {errors.emailError && (
          <div className="error">{SIGNUP_ERROR_MESSAGE.EMAIL}</div>
        )}
        <br />
        <br />
        <input
          type="checkbox"
          id="infoAgree"
          checked={formData.infoAgree}
          onChange={handleInputChange}
        />
        <label htmlFor="infoAgree">개인 정보 동의</label>
        <input
          type="checkbox"
          id="snsPush"
          checked={formData.snsPush}
          onChange={handleInputChange}
        />
        <label htmlFor="snsPush">sns 푸쉬 동의</label>
        <input
          type="checkbox"
          id="emailPush"
          checked={formData.emailPush}
          onChange={handleInputChange}
        />
        <label htmlFor="emailPush">e-mail 푸쉬 동의</label>
        <div className="buttonCollection">
          <input
            type="submit"
            className="submitBtn"
            value="확인"
            onClick={handleSubmit}
          />
          <input
            type="button"
            className="submitBtn"
            value="취소"
            onClick={goLogin}
          />
        </div>
      </form>
    </div>
  );
}

export default SignUp;
