import axios from "axios";
import {
  setFormData,
  setCertificateCode,
  setIsPhoneDisabled,
} from "../pages/SignUp";
export function sendCode(phoneNumber) {
  return axios
    .get(`/smsapi/sendCode?phoneNumber=${phoneNumber}`)
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      console.log(e);
    });
}

export function checkCode(phoneNumber, code) {
  return axios
    .get(`/smsapi/checkCode?phoneNumber=${phoneNumber}&code=${code}`)
    .then((res) => {
      if (res.data === "duplicateNum") {
        // 중복되는 휴대폰 번호가 있을 때
        alert("중복되는 휴대폰 번호가 있습니다.");
        setFormData((prevFormData) => ({ ...prevFormData, phone: "" })); // 휴대폰 번호 입력란 비우기
        setCertificateCode(""); // 인증번호 입력란 비우기
        setIsPhoneDisabled(false); // isPhoneDisabled 값을 false로 변경
      } else if (res.data === "Ok") {
        // 인증번호 일치, 중복되는 휴대폰 번호 없을 때
        if (window.confirm("휴대폰 번호를 사용하시겠습니까?")) {
          // 휴대폰 번호를 사용할 것인지 묻는 알림창
          setIsPhoneDisabled(true); // isPhoneDisabled 값을 true로 변경
        }
      } else if (res.data === "Wrong") {
        // 인증번호 불일치
        alert("유효하지 않은 인증번호입니다.");
        setCertificateCode(""); // 인증번호 입력란 비우기
        setFormData((prevFormData) => ({ ...prevFormData, phone: "" })); // 휴대폰 번호 입력란 비우기
      }
    })
    .catch((e) => {
      console.log(e);
    });
}

// export function checkCode(phoneNumber, code) {
//   return axios
//     .get(`/smsapi/checkCode?phoneNumber=${phoneNumber}&code=${code}`)
//     .then((res) => {
//       console.log(res);
//     })
//     .catch((e) => {
//       console.log(e);
//     });
// }
