import "../styles/SignUp.css";
import React, { useState, useEffect } from "react";
import "../styles/SignUp.css";
import axios from "axios";
import Correct from "../assets/correct.png";
import Wrong from "../assets/wrong.png";
import { validateForm } from "../constants/Validation";
import { SIGNUP_ERROR_MESSAGE } from "../constants/Messages";
import { checkCode, sendCode } from "../constants/PhoneCertification";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function SignUp() {
  const [showCertificate, setShowCertificate] = useState(false);
  const [emailDuplicateStatus, setEmailDuplicateStatus] = useState(0);
  const [idDuplicateStatus, setIdDuplicateStatus] = useState(0);
  const [certificateCode, setCertificateCode] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [formData, setFormData] = useState({
    id: "",
    password: "",
    confirmPassword: "",
    name: "",
    email: "",
    phone: "",
    birthDate: "",
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

  //handlephonecertificate : 휴대폰 번호를 백으로 보내, 문자 발송시킴
  function handlePhoneCertificate() {
    sendCode(formData.phone);
    setShowCertificate(true);
  }
  //handlephonecertificate2 : 휴대폰 인증번호 일치 여부를 백으로 질문
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
          alert(SIGNUP_ERROR_MESSAGE.EMAIL_DUPLICATE);
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
          alert(SIGNUP_ERROR_MESSAGE.ID_DUPLICATE);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function handleBirthDateChange(date) {
    setSelectedDate(date);
  }

  function formatBirthDate(date) {
    if (!date) return "";
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return month + day;
  }
  function handleBirthDateConfirm() {
    setFormData((prevFormData) => ({
      ...prevFormData,
      birthDate: formatBirthDate(selectedDate),
    }));
  }
  useEffect(() => {
    console.log(formData);
    const formErrors = validateForm(formData);
    setErrors(formErrors);
    // console.log(formErrors);
  }, [formData]);

  function handleInputChange(e) {
    const { id, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prevFormData) => ({ ...prevFormData, [id]: checked }));
    } else {
      setFormData((prevFormData) => ({ ...prevFormData, [id]: value }));
    }

    // setEmailDuplicateStatus(0);
    // setIdDuplicateStatus(0);
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
            autoComplete="new-password"
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
            autoComplete="new-password"
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
            autoComplete="new-password"
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
                e.preventDefault();
                handlePhoneCertificate();
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

        <div>
          <Calendar onChange={handleBirthDateChange} value={selectedDate} />
          <button
            onClick={(e) => {
              e.preventDefault();
              handleBirthDateConfirm();
            }}
          >
            확인
          </button>
        </div>
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
