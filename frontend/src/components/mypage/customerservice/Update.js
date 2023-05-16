import styled from "styled-components";
import {
  updateMember,
  deleteMember,
  getMemberInfo,
} from "../../../api/MemberApi";
import { useState, useEffect, useRef } from "react";
import { getCookie, removeCookie } from "../../../utils/Cookies";
import DEFAULT_USER_IMAGE from "../../../assets/mypage/user.png";

export const Update = () => {
  const fileInput = useRef(null);
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");

  const DefaultProfileImageURL =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

  useEffect(() => {
    const fetchMemberInfo = async () => {
      const accessToken = getCookie("accessToken");
      const getInfo = await getMemberInfo(accessToken);
      const { name, id, email, nickname, image } = getInfo;
      if (getInfo.image) {
        setImage({ image });
      } else {
        setImage(DefaultProfileImageURL);
      }
      setName(name);
      setId(id);
      setEmail(email);
      setNickname(nickname);
    };
    fetchMemberInfo();
  }, []);

  const changeHandle = (event) => {
    const imageFile = event.target.files[0];
    const imageUrl = URL.createObjectURL(imageFile);
    setImage(imageUrl);
  };

  const withdrawHandle = async () => {
    if (window.confirm("정말 회원 탈퇴를 진행하시겠습니까?")) {
      await deleteMember(id).then(
        removeCookie("accessToken"),
        (window.location.href = "/")
      );
    }
  };

  return (
    <Wrap>
      <ContentHeader>회원 정보 수정</ContentHeader>
      <UpdateFormWrap>
        <Box>
          <ProfileContainer>
            <ImageBox>
              <ProfileImage src={image} alt="프로필 이미지" />
            </ImageBox>
            <ImageInputContainer>
              <ImageUpload
                type="file"
                accept="image/*"
                name="image"
                ref={fileInput}
                onChange={changeHandle}
              ></ImageUpload>
              <ImageLabel
                onClick={() => {
                  fileInput.current.click();
                }}
              >
                프로필 이미지 변경
              </ImageLabel>
            </ImageInputContainer>
          </ProfileContainer>
        </Box>
        <Box>
          <Label>이름</Label>
          <InputBox>
            <DisabledInput readOnly value={name} />
          </InputBox>
        </Box>
        <Box>
          <Label>아이디</Label>
          <InputBox>
            <DisabledInput readOnly value={id} />
          </InputBox>
        </Box>
        <Box>
          <Label>이메일</Label>
          <InputBox>
            <DisabledInput readOnly value={email} />
          </InputBox>
        </Box>
        {/* <Box>
          <Label>현재 비밀번호</Label>
          <InputBox>
            <Input
              type="password"
              value={userInfo.password}
              onChange={handleChange}
            ></Input>
          </InputBox>
        </Box> */}
        {/* <Box>
          <Label>새 비밀번호</Label>
          <InputBox>
            <Input
              type="password"
              placeholder="새 비밀번호"
              style={{ marginBottom: 25 }}
              value={userInfo.newPassword}
              onChange={handleChange}
            ></Input>
            <Input
              type="password"
              placeholder="새 비밀번호 확인"
              value={userInfo.newPasswordCheck}
              onChange={handleChange}
            ></Input>
          </InputBox>
        </Box> */}
        <Box>
          <Label>닉네임</Label>
          <InputBox>
            <Input type="text"></Input>
          </InputBox>
        </Box>
        <ButtonBox>
          <UpdateButton>수정</UpdateButton>
        </ButtonBox>
        <ButtonBox>
          <WithdrawButton onClick={withdrawHandle}>회원탈퇴</WithdrawButton>
        </ButtonBox>
      </UpdateFormWrap>
    </Wrap>
  );
};

const Wrap = styled.div`
  border-bottom: 2px solid black;
`;

const ContentHeader = styled.div`
  padding: 20px 0;
  font-size: 30px;
  font-weight: 700;
  border-bottom: 2px solid black;
`;

const UpdateFormWrap = styled.div`
  padding: 20px 100px 40px 160px;
`;

const Box = styled.div`
  justify-content: center;
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
  width: 180px;
  height: 180px;
  border-radius: 50%;
`;

const ProfileContainer = styled.div``;

const ImageInputContainer = styled.div``;

const ImageLabel = styled.div`
  font-size: 18px;
  margin-top: 20px;
  cursor: pointer;
  text-align: center;
  :hover {
    font-weight: 800;
  }
`;

const ImageUpload = styled.input`
  display: none;
`;

const ProfileImage = styled.img`
  overflow: hidden;
  max-width: 100%;
  max-height: 100%;
  border-radius: 50%;
`;

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
  cursor: pointer;
`;

const WithdrawButton = styled.button`
  color: grey;
  background-color: black;
  border: none;
  cursor: pointer;
`;
