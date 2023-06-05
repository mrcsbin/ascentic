import axios from "axios";

const MEMBER_API_URL = "http://localhost:8080/member";

// 회원가입
export const 회원가입 = async (e) => {
  const response = await axios.post(`${MEMBER_API_URL}/signup`, {
    /* data */
  });
  return response.data;
};

// 회원 수정
export const updateMember = async (accessToken, password, newPassword) => {
  const response = await axios.patch(
    `${MEMBER_API_URL}/userUpdate`,
    {
      password,
      newPassword,
    },
    {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    }
  );
  console.log(response.data);
  return response.data;
};

// 회원 프로필이미지 수정
export const updateProfileImg = async (accessToken, profileImg) => {
  const response = await axios.post(
    `${MEMBER_API_URL}/updateProfile`,
    profileImg,
    {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    }
  );
  return response.data;
};

// 회원 프로필이미지 삭제 API
export const delProfileImg = async (accessToken) => {
  const response = await axios.get(`${MEMBER_API_URL}/delProfile`, {
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  });
  return response.data;
};

// 회원 삭제
export const deleteMember = async (id) => {
  const response = await axios.delete(`${MEMBER_API_URL}/${id}/v2`, {});
  return response.data;
};

// 로그인
export const login = async (id, password) => {
  const response = await axios.post(`${MEMBER_API_URL}/login`, {
    id,
    password,
  });
  return response.data;
};

// 토큰으로 유저 정보 받아옴
export const getMemberInfo = async (accessToken) => {
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
export const findId = async (name, phone) => {
  const response = await axios.post(`${MEMBER_API_URL}/find/id`, {
    name,
    phone,
  });
  return response.data;
};

// PW 찾기
export const findPw = async (name, id, phone) => {
  const response = await axios.post(`${MEMBER_API_URL}/find/pw`, {
    name,
    id,
    phone,
  });
  return response.data;
};

//인증번호 발송
export const sendCode = async (phone) => {
  const response = await axios
    .post("/smsapi/sendCode", phone, {
      headers: { "Content-Type": "" },
    })
    .then((res) => {
      console.log(res.data);
      alert(res.data);
      if (
        res.data ===
        "문자가 발송되었습니다. 3분안에 인증번호를 입력하세요. (1시간 이내에 같은 번호로는 3번까지 인증번호 요청이 가능합니다.)"
      ) {
        return true; //올바른 요청시 true반환
      } else {
        return false; //인증시간 초과 등의 이유로 서버응답이 다른 문구가 오면 false반환
      }
    });
  return response;
};

//인증번호 비교
export const checkCode = async (phone, code) => {
  const response = await axios
    .post(
      "/smsapi/checkCode",
      { phone, code },
      {
        headers: { "Content-Type": "application/json" },
      }
    )
    .then((res) => {
      return res.data;
    });
  return response;
};

// 주문자 정보 조호
export const getOrderInfo = async (accessToken) => {
  try {
    const response = await axios.get(`${MEMBER_API_URL}/order/getuser`, {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
