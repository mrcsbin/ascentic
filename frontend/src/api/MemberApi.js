import axios from "axios";
import Cookies from "js-cookie";
import { setCookie, getCookie, removeCookie } from "../utils/Cookie";

const MEMBER_API_URL = "http://localhost:8080/member";

// 회원가입
export const 회원가입 = async (e) => {
  const response = await axios.post(`${MEMBER_API_URL}/signup`, {
    /* data */
  });
  return response.data;
};

// 회원 수정
export const updateMember = async (id, name, email) => {
  const response = await axios.post(`${MEMBER_API_URL}/${id}`, {
    /* data */
  });
  return response.data;
};

// 회원 삭제
export const deleteMember = async (id, name, email) => {
  const response = await axios.post(`${MEMBER_API_URL}/${id}`, {
    /* data */
  });
  return response.data;
};

// 로그인
export const login = async (id, password) => {
  const response = await axios.post(`${MEMBER_API_URL}/login`, {
    id,
    password,
  });
  const { accessToken, refreshToken } = response.data;

  setCookie("accessToken", accessToken);
  setCookie("refreshToken", refreshToken);
  return response.data;
};

// 토큰으로 유저 정보 받아옴
export const getTokenInfo = async (accessToken) => {
  const response = await axios.get(`${MEMBER_API_URL}/checktoken`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

export const userTest = async (accessToken) => {
  const response = await axios.get(`${MEMBER_API_URL}/user`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

export const adminTest = async (accessToken) => {
  const response = await axios.get(`${MEMBER_API_URL}/admin`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

// ID 찾기
export const findId = async (name, email) => {
  const response = await axios.post(`${MEMBER_API_URL}/find/id`, {
    name,
    email,
  });
  return response.data;
};

// PW 찾기
export const findPw = async (name, id, email) => {
  const response = await axios.post(`${MEMBER_API_URL}/find/pw`, {
    name,
    id,
    email,
  });
  return response.data;
};
