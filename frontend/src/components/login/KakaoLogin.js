import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getMemberInfo } from "../../api/MemberApi";
import { getCookie, setCookie } from "../../utils/Cookies";

const KakaoLogin = () => {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    const login = async () => {
      const response = await axios.get(
        `http://localhost:8080/oauth/kakao?code=${code}`
      );
      if (response.data) {
        const { accessToken, refreshToken } = response.data;
        const expires = new Date(Date.now() + 30 * 60 * 1000);
        setCookie("accessToken", accessToken, { expires });
        setCookie("refreshToken", refreshToken, { expires });
        await getMemberInfo(getCookie("accessToken")).then(() => {
          window.location.replace("/");
        });
      }
    };
    login();
  }, []);
};

export default KakaoLogin;
