import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { setActiveTab } from "../../../store/modules/mypage";
import { deleteMember } from "../../../api/MemberApi";
import { getCookie, removeCookie } from "../../../utils/Cookies";

export const Withdrawal = () => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState();

  useEffect(() => {
    const fetchProfileData = async () => {
      dispatch(setActiveTab("회원탈퇴"));
    };
    fetchProfileData();
  }, [dispatch]);

  const submitHandle = async () => {
    if (password) {
      await deleteMember(getCookie("accessToken"), password).then(
        (response) => {
          alert(response);
          if (response === "탈퇴가 완료 되었습니다.") {
            removeCookie("accessToken");
            window.location.href = "/";
          }
        }
      );
    } else {
    }
  };

  return (
    <Wrap>
      <ContentHeader>회원탈퇴</ContentHeader>
      <PasswordUpdateBox>
        <CurrentPasswordBox>
          <div>현재 비밀번호를 입력해주세요.</div>
          <CurrentPasswordInput
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></CurrentPasswordInput>
        </CurrentPasswordBox>
        <ButtonBox>
          <SubmitButton onClick={submitHandle}>회원탈퇴</SubmitButton>
        </ButtonBox>
      </PasswordUpdateBox>
    </Wrap>
  );
};

const Wrap = styled.div``;

const ContentHeader = styled.div`
  padding: 0px 0px 20px 0;
  font-size: 1.8rem;
  font-weight: 700;
  border-bottom: 1px solid grey;
`;

const PasswordUpdateBox = styled.div`
  width: 500px;
  padding: 40px;
  color: #292929;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
  margin: 100px auto;
`;

const CurrentPasswordBox = styled.div`
  margin: 20px 0 40px 0;
`;

const Label = styled.div`
  font-size: 1.7rem;
  font-weight: 600;
  margin-bottom: 10px;
`;

const CurrentPasswordInput = styled.input`
  margin-top: 10px;
  width: 100%;
  height: 50px;
  border: none;
  border-bottom: 0.5px solid grey;
  box-sizing: border-box;
  padding: 10px 11px;
  font-size: 1.5rem;
  outline: none;
  :focus {
    border-bottom: 2px solid black;
  }
`;

const SubmitButton = styled.span`
  color: rgba(34, 34, 34, 0.5);
  font-size: 1.2rem;
  margin-top: 10px;
  border: 1px solid rgba(34, 34, 34, 0.5);
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
`;

const ButtonBox = styled.div`
  text-align: center;
  margin: 3rem auto 0 auto;
`;
