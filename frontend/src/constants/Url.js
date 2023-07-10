const KAKAO_CLIENT_ID = "881ddf35c504cf62f0d76586502b03ca";
const KAKAO_REDIRECT_URI = "http://localhost:8080/oauth/kakao";
const test = "http://localhost:3000/login/kakao";

const FACEBOOK_CLIENT_ID = "";
const FACEBOOK_REDIRECT_URI = "";

const NAVER_CLIENT_ID = "";
const NAVER_REDIRECT_URI = "";

export const AUTH_URL = {
  facebook: ``,
  kakao: `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${test}&response_type=code`,
  naver: ``,
};
