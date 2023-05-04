import axios from "axios";

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
      console.log(res);
      // if (res.data === false) {
      //   setEmailDuplicateStatus(1); // 중복이 아닐 때
      // } else {
      //   setEmailDuplicateStatus(2); // 중복일 때
      // }
    })
    .catch((e) => {
      console.log(e);
    });
}
