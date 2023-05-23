import "../styles/SignUp.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Correct from "../assets/correct.png";
import Wrong from "../assets/wrong.png";
import { validateForm } from "../constants/Validation";
import { SIGNUP_ERROR_MESSAGE } from "../constants/Message";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Timer from "../components/common/Timer";
function SignUp() {
  const [showCertificate, setShowCertificate] = useState(false);

  const [emailDuplicateStatus, setEmailDuplicateStatus] = useState(0);
  const [idDuplicateStatus, setIdDuplicateStatus] = useState(0);
  const [certificateCode, setCertificateCode] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
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
  const handleCheckTime = () => {
    alert(SIGNUP_ERROR_MESSAGE.PHONE_TIMEOVER);
    document.getElementById("phone").value = "";
    setShowCertificate(false);
    setFormData((prevFormData) => ({ ...prevFormData, phone: "" }));
    setIsPhoneDisabled(false);
  };

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isIdDisabled, setIsIdDisabled] = useState(false);
  const [isEmailDisabled, setIsEmailDisabled] = useState(false);
  const [isPhoneDisabled, setIsPhoneDisabled] = useState(false);

  const handleCertificateCode = (e) => {
    setCertificateCode(e.target.value);
  };

  function sendCode(phoneNumber) {
    return axios
      .post("/smsapi/sendCode", phoneNumber, {
        headers: { "Content-Type": "" },
      })
      .then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          alert(res.data);
          if (
            res.data ===
            "인증 횟수를 초과하였습니다. 1시간 후에 다시 시도 바랍니다."
          ) {
            document.getElementById("phone").value = ""; //ref달아야되는데,,,,
            setShowCertificate(false);
            setFormData((prevFormData) => ({ ...prevFormData, phone: "" }));
            setIsPhoneDisabled(false);
            console.log(showCertificate);
          } else {
            setShowCertificate(true);
          }
        }
      })
      .catch((e) => {
        const errorMessage = e.res.data;
        alert(errorMessage);
        document.getElementById("phone").value = "";
        document.getElementById("certificateCode").value = "";
        setShowCertificate(false);
        setFormData((prevFormData) => ({ ...prevFormData, phone: "" }));
        setIsPhoneDisabled(false);
      });
  }

  function checkCode(phone, code) {
    console.log(code);
    return axios
      .post(
        "/smsapi/checkCode",
        { phone, code },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        if (res.data === "duplicateNum") {
          // 중복되는 휴대폰 번호가 있을 때
          alert("중복되는 휴대폰 번호가 있습니다.");
          document.getElementById("phone").value = ""; // 휴대폰 번호 입력란 비우기
          document.getElementById("certificateCode").value = ""; // 인증번호 입력란 비우기
          setShowCertificate(false);
          setFormData((prevFormData) => ({ ...prevFormData, phone: "" }));
          setIsPhoneDisabled(false); // isPhoneDisabled 값을 false로 변경
        } else if (res.data === "Ok") {
          // 인증번호 일치, 중복되는 휴대폰 번호 없을 때
          if (window.confirm("휴대폰 번호를 사용하시겠습니까?")) {
            // 휴대폰 번호를 사용할 것인지 묻는 알림창
            setIsPhoneDisabled(true); // isPhoneDisabled 값을 true로 변경
            setShowCertificate(false);
          }
        } else if (res.data === "Wrong") {
          // 인증번호 불일치
          alert("유효하지 않은 인증번호입니다.");
          document.getElementById("certificateCode").value = ""; // 인증번호 입력란 비우기
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  //handlephonecertificate : 휴대폰 번호를 백으로 보내, 문자 발송시킴
  function handlePhoneCertificate() {
    sendCode(formData.phone);
  }
  //handlephonecertificate2 : 휴대폰 인증번호 일치 여부를 백으로 질문
  function handlePhoneCertificate2() {
    checkCode(formData.phone, certificateCode);
  }
  function handleEmailCheck() {
    axios
      .get(`/member/emailDuplicate/${formData.email}`)
      .then((res) => {
        console.log(res);
        if (res.data === false) {
          if (window.confirm(`해당 이메일을 사용하시겠습니까?`)) {
            // 예 버튼을 눌렀을 때
            setIsButtonDisabled(false);
            setIsEmailDisabled(true);
          }
          setEmailDuplicateStatus(1);
          setIsButtonDisabled(false);
        } else {
          setEmailDuplicateStatus(2);
          setIsButtonDisabled(true);
          setIsEmailDisabled(false);
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
          if (window.confirm(`해당 아이디를 사용하시겠습니까?`)) {
            // 예 버튼을 눌렀을 때
            setIsButtonDisabled(false);
            setIsIdDisabled(true);
            setIdDuplicateStatus(1);
          } else {
            setIdDuplicateStatus(0);
            setIsButtonDisabled(false);
          }
        } else {
          setIdDuplicateStatus(2);
          setIsButtonDisabled(true);
          setIsIdDisabled(false);
          alert(SIGNUP_ERROR_MESSAGE.ID_DUPLICATE);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }
  function handleBirthDateChange(date) {
    setSelectedDate(date);
    setFormData((prevFormData) => ({
      ...prevFormData,
      birthDate: formatBirthDate(date),
    }));
    if (formData.birthDate !== "") {
      setShowCalendar(false);
    }
  }

  function formatBirthDate(date) {
    if (!date) return "";
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return month + day;
  }
  useEffect(() => {
    const formErrors = validateForm(formData);
    setErrors(formErrors);
    setIsButtonDisabled(Object.values(formErrors).some((error) => error));
  }, [formData]);

  function handleInputChange(e) {
    const { id, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prevFormData) => ({ ...prevFormData, [id]: checked }));
    } else {
      setFormData((prevFormData) => ({ ...prevFormData, [id]: value }));
    }
    console.log(formData);

    setShowCertificate(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const isValid =
      formData.id &&
      formData.password &&
      formData.confirmPassword &&
      formData.name &&
      formData.email &&
      formData.phone &&
      formData.birthDate &&
      typeof formData.infoAgree === "boolean";

    if (!isValid) {
      alert("모든 값을 정확히 입력해주세요.");
      return;
    }
    axios
      .post("/member/insert", formData)
      .then((res) => {
        console.log(res.data);
        alert(res.data);
        window.location.href = "/";
      })
      .catch((e) => {
        console.error(e);
        alert(e);
      });
  }

  function goLogin() {
    window.location.href = "/login";
  }

  useEffect(() => {
    const isAuthenticationCompleted =
      emailDuplicateStatus === 1 && idDuplicateStatus === 1;
    setIsButtonDisabled(
      !isAuthenticationCompleted ||
        Object.values(errors).some((error) => error) ||
        !formData.infoAgree ||
        !isPhoneDisabled ||
        !formData.birthDate
    );
  }, [
    emailDuplicateStatus,
    idDuplicateStatus,
    errors,
    formData.infoAgree,
    isPhoneDisabled,
    formData.birthDate,
  ]);

  return (
    <div className="signupFrm">
      <form action="submit" className="form">
        <h1 className="title">회원가입</h1>
        <div className="inputContainer">
          <input
            type="text"
            className={`input ${isIdDisabled ? "disabled" : ""}`}
            id="id"
            placeholder="a"
            disabled={isIdDisabled}
            autoComplete="new-password"
            onChange={handleInputChange}
          />
          <label htmlFor="id" className="label">
            아이디
          </label>
          {formData.id.length >= 2 && !errors.idError && (
            <button
              id="verifyBtn"
              disabled={isIdDisabled}
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
            className={`input ${isPhoneDisabled ? "disabled" : ""}`}
            placeholder="a"
            disabled={isPhoneDisabled}
            onChange={handleInputChange}
          />
          <label htmlFor="phone" className="label">
            전화번호
          </label>
          {!errors.phoneError && formData.phone.length >= 2 && (
            <button
              id="verifyBtn"
              disabled={isPhoneDisabled}
              onClick={(e) => {
                e.preventDefault();
                handlePhoneCertificate();
              }}
            >
              인증하기
            </button>
          )}
          {isPhoneDisabled && (
            <img className="verify-correct" src={Correct} alt="" />
          )}
        </div>
        {!isPhoneDisabled && showCertificate && (
          <div className="inputCertificateContainer">
            <input
              id="certificateCode"
              type="text"
              className="input"
              placeholder="a"
              onChange={handleCertificateCode}
            />
            <div className="timer">
              <Timer
                timerActive={showCertificate}
                onCheckTime={handleCheckTime}
              />
            </div>

            <button
              id="certificateVerify"
              onClick={(e) => {
                e.preventDefault();
                handlePhoneCertificate2();
              }}
            >
              검증
            </button>
          </div>
        )}
        {errors.phoneError && (
          <div className="error">{SIGNUP_ERROR_MESSAGE.PHONE}</div>
        )}
        <div className="inputContainer">
          <div>
            <input
              id="email"
              type="text"
              className={`input ${isEmailDisabled ? "disabled" : ""}`}
              placeholder="a"
              disabled={isEmailDisabled}
              onChange={handleInputChange}
            />
            <label htmlFor="email" className="label">
              이메일
            </label>
            {!errors.emailError && formData.email.length >= 2 && (
              <button
                id="verifyBtn"
                disabled={isEmailDisabled}
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
        <div className="inputContainer">
          <input
            id="birthDate"
            type="text"
            className="input"
            placeholder="a"
            onChange={handleInputChange}
            value={selectedDate ? selectedDate.toLocaleDateString() : ""}
          />
          <label htmlFor="birthDate" className="label">
            생일
          </label>
          <button
            id="showCalendar"
            onClick={(e) => {
              e.preventDefault();
              setShowCalendar(!showCalendar);
            }}
          >
            📅
          </button>
        </div>
        {showCalendar && (
          <Calendar onChange={handleBirthDateChange} value={selectedDate} />
        )}
        <br />
        <br />
        <input
          type="checkbox"
          id="infoAgree"
          checked={formData.infoAgree}
          onChange={handleInputChange}
        />
        <label htmlFor="infoAgree">개인 정보 동의 (필수)</label>
        <br />
        <br />
        <input
          type="checkbox"
          id="snsPush"
          checked={formData.snsPush}
          onChange={handleInputChange}
        />
        <label htmlFor="snsPush">sns 푸쉬 동의 (선택)</label>
        <br />
        <br />
        <input
          type="checkbox"
          id="emailPush"
          checked={formData.emailPush}
          onChange={handleInputChange}
        />
        <label htmlFor="emailPush">e-mail 푸쉬 동의 (선택)</label>
        <br />
        <br />
        <div className="buttonCollection">
          <input
            type="submit"
            className="submitBtn"
            value="회원가입"
            onClick={handleSubmit}
            disabled={isButtonDisabled}
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
