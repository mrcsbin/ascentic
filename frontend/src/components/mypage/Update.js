import styled from "styled-components";
import { updateMember, deleteMember, getMemberInfo } from "../../api/MemberApi";
import { useState, useEffect } from "react";
import { getCookie } from "../../utils/Cookies";

export const Update = () => {
  const [userInfo, setUserInfo] = useState({
    id: "",
    email: "",
    name: "",
    nickname: "",
  });

  const [newUserInfo, setNewUserInfo] = useState({
    id: userInfo.id,
    email: userInfo.email,
    name: userInfo.name,
    nickname: userInfo.nickname,
    password: userInfo.password,
    passwordCheck: "",
  });

  useEffect(() => {
    const fetchMemberInfo = async () => {
      const accessToken = getCookie("accessToken");
      const getInfo = await getMemberInfo(accessToken);
      const { password, ...infoWithoutPassword } = getInfo;
      setUserInfo((prevState) => ({
        ...prevState,
        ...infoWithoutPassword,
      }));
    };
    fetchMemberInfo();
  }, []);

  const handleChange = (e) => {
    setUserInfo((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const updateClickHandle = async () => {
    console.log(newUserInfo);
    // const res = await updateMember();
  };

  const withdrawClickHandle = async () => {
    const res = await deleteMember();
  };

  return (
    <UpdateFormWrap>
      <Box>
        <Label>이름</Label>
        <InputBox>
          <DisabledInput readOnly value={userInfo.name} />
        </InputBox>
      </Box>
      <Box>
        <Label>아이디</Label>
        <InputBox>
          <DisabledInput readOnly value={userInfo.id} />
        </InputBox>
      </Box>
      <Box>
        <Label>이메일</Label>
        <InputBox>
          <DisabledInput readOnly value={userInfo.email} />
        </InputBox>
      </Box>
      <Box>
        <Label>현재 비밀번호</Label>
        <InputBox>
          <Input
            type="password"
            value={userInfo.password}
            onChange={handleChange}
          ></Input>
        </InputBox>
      </Box>
      <Box>
        <Label>새 비밀번호</Label>
        <InputBox>
          <Input
            type="password"
            placeholder="새 비밀번호"
            style={{ marginBottom: 25 }}
            value={userInfo.password}
            onChange={handleChange}
          ></Input>
          <Input
            type="password"
            placeholder="새 비밀번호 확인"
            value={userInfo.passwordCheck}
            onChange={handleChange}
          ></Input>
        </InputBox>
      </Box>
      <Box>
        <Label>별명</Label>
        <InputBox>
          <Input
            type="text"
            value={userInfo.nickname}
            onChange={handleChange}
          ></Input>
        </InputBox>
      </Box>
      <Box>
        <Label>프로필 사진</Label>
        <ProfileContainer>
          <ImageBox>
            <ProfileImage />
          </ImageBox>
          <UploadButtonBox>
            <UploadButton>업로드</UploadButton>
          </UploadButtonBox>
          <InputBox>
            <Input onChange={handleChange}></Input>
          </InputBox>
        </ProfileContainer>
      </Box>

      <ButtonBox>
        <UpdateButton onClick={updateClickHandle}>수정</UpdateButton>
      </ButtonBox>
      <ButtonBox>
        <WithdrawButton onClick={withdrawClickHandle}>회원탈퇴</WithdrawButton>
      </ButtonBox>
    </UpdateFormWrap>
  );
};

const UpdateFormWrap = styled.div`
  padding: 40px 100px 40px 160px;
`;

const Box = styled.div`
  display: flex;
  margin: 30px 0;
`;

const Label = styled.div`
  padding-left: 50px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  font-size: 20px;
  cursor: default;
  width: 40%;
`;

const DisabledInput = styled.input`
  width: 70%;
  padding: 10px;
  box-sizing: border-box;
  cursor: default;
  border: none;
  font-size: 20px;
`;

const InputBox = styled.div`
  padding-right: 50px;
  width: 70%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  justify-content: center;
`;

const Input = styled.input`
  width: 100%;
  font-size: 20px;
  padding: 10px;
  border: 1px solid grey;
  box-sizing: border-box;
  border-radius: 5px;
`;

const ImageBox = styled.div`
  border: 1px solid black;
  width: 80px;
  height: 80px;
  border-radius: 50%;
`;

const ProfileContainer = styled.div`
  display: flex;
`;

const UploadButtonBox = styled.div`
  text-align: center;
  width: 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 10px;
`;

const UploadButton = styled.div`
  box-sizing: border-box;
  padding: 15px 4px;
  border-radius: 10px;
  background-color: black;
  color: white;
`;

const ProfileImage = styled.img``;

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  background-color: black;
  padding: 0 50px;
  box-sizing: border-box;
  margin-bottom: 30px;
  border-radius: 5px;
`;

const UpdateButton = styled.button`
  font-size: 30px;
  border: none;
  color: white;
  background-color: black;
`;

const WithdrawButton = styled.button`
  color: grey;
  background-color: black;
  border: none;
`;
