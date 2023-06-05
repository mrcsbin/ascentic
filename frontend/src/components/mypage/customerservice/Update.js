import styled, { css } from "styled-components";
import {
  updateMember,
  deleteMember,
  getMemberInfo,
  updateProfileImg,
  delProfileImg,
} from "../../../api/MemberApi";
import { useState, useEffect, useRef } from "react";
import { getCookie, removeCookie } from "../../../utils/Cookies";

export const Update = () => {
  const fileInput = useRef(null);
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordCheck, setNewPasswordCheck] = useState("");
  const [profileImg, setProfileImg] = useState();
  const [isImgDel, setIsImgDel] = useState(false);

  const DefaultProfileImageURL =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

  useEffect(() => {
    const fetchMemberInfo = async () => {
      const accessToken = getCookie("accessToken");
      const getInfo = await getMemberInfo(accessToken);
      const { name, id, email, nickname, image } = getInfo;
      // if (getInfo.image) {
      //   setImage(image);
      // } else {
      //   setImage(DefaultProfileImageURL);
      // }
      if (getInfo.image === null) {
        setImage(DefaultProfileImageURL);
      } else {
        setImage(`http://localhost:8080/images/${image}`);
      }

      setName(name);
      setId(id);
      setEmail(email);
      setNickname(nickname);
    };
    fetchMemberInfo();
  }, []);

  const changeHandle = (event) => {
    setIsImgDel(false);
    const imageFile = event.target.files[0];
    setProfileImg(imageFile);
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

  const updateHandle = async () => {
    const accessToken = getCookie("accessToken");

    if (profileImg !== undefined) {
      const imageFormData = new FormData();
      imageFormData.append("profileImg", profileImg);
      await updateProfileImg(accessToken, imageFormData).then(
        alert("프로필 이미지 변경되었습니다.")
      );
    }

    if (isImgDel) {
      await delProfileImg(accessToken).then(alert("프로필 이미지 삭제"));
    }

    if (password !== "" || newPassword !== "") {
      // 예외 아직 XX
      const res = await updateMember(accessToken, password, newPassword);

      if (res === "success") {
        alert("회원정보가 수정되었습니다.");
        window.location.href = "/mypage/update";
      } else {
        alert("현재 비밀번호가 틀립니다.");
      }
    }
  };

  const imgdelHandle = () => {
    setImage(DefaultProfileImageURL);
    setIsImgDel(true);
  };
  return (
    <Wrap>
      <ContentHeader>회원 정보 수정</ContentHeader>
      <UpdateFormWrap>
        <Box>
          <ProfileContainer>
            <ImageBox>
              <ProfileImage src={image} alt="프로필 이미지" />
              {image === DefaultProfileImageURL ? null : (
                <DeleteButton onClick={() => imgdelHandle()}>
                  삭제하기
                </DeleteButton>
              )}
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
        <Box>
          <Label>현재 비밀번호</Label>
          <InputBox>
            <Input
              type="password"
              placeholder="현재 비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Input>
          </InputBox>
        </Box>
        <Box>
          <Label>새 비밀번호</Label>
          <InputBox>
            <Input
              type="password"
              placeholder="새 비밀번호"
              onChange={(e) => setNewPassword(e.target.value)}
            ></Input>
            {newPassword === newPasswordCheck ? null : (
              <Warning>비밀번호가 일치하지 않습니다.</Warning>
            )}
          </InputBox>
        </Box>
        <Box>
          <Label></Label>
          <InputBox>
            <Input
              type="password"
              placeholder="새 비밀번호 확인"
              onChange={(e) => setNewPasswordCheck(e.target.value)}
            ></Input>
            {newPassword === newPasswordCheck ? null : (
              <Warning>비밀번호가 일치하지 않습니다.</Warning>
            )}
          </InputBox>
        </Box>
        <Box>
          <Label>닉네임</Label>
          <InputBox>
            <Input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            ></Input>
          </InputBox>
        </Box>
        <UpdateButtonBox>
          <UpdateButton onClick={updateHandle}>수정하기</UpdateButton>
        </UpdateButtonBox>
        <WithdrawalButtonBox>
          <WithdrawButton onClick={withdrawHandle}>회원탈퇴</WithdrawButton>
        </WithdrawalButtonBox>
      </UpdateFormWrap>
    </Wrap>
  );
};

const Wrap = styled.div`
  // border-bottom: 2px solid black;
`;

const ContentHeader = styled.div`
  padding: 20px 0;
  font-size: 30px;
  font-weight: 700;
  border-bottom: 2px solid black;
`;

const UpdateFormWrap = styled.div`
  padding: 20px 100px 0px 160px;
`;

const Box = styled.div`
  justify-content: center;
  display: flex;
  margin: 30px 0;
`;

const Label = styled.div`
  // padding-left: 50px;
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
  position: relative;
  // padding-right: 50px;
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
  ${(props) =>
    !props.isChecked &&
    css`
      ::hover {
        width: 500px;
        height: 500px;
      }
    `}
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
  /* max-width: 100%;
  max-height: 100%; */
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;

const DeleteButton = styled.div`
  background-color: #fff;
  color: #333;
  opacity: 0;
  transition: opacity 0.3s;
  cursor: pointer;
  text-align: center;
  ${ImageBox}:hover & {
    opacity: 1;
  }
`;

const UpdateButtonBox = styled.div`
  margin-top: 50px;
  height: 50px;
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

const WithdrawalButtonBox = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 50px;
  box-sizing: border-box;
  margin-bottom: 30px;
  border-radius: 5px;
`;

const WithdrawButton = styled.button`
  font-size: 12px;
  color: grey;
  background: white;
  border: none;
  cursor: pointer;
`;

const Warning = styled.div`
  padding: 5px;
  position: absolute;
  top: 100%;
  font-size: 12px;
  color: red;
  opacity: 0;
  animation: fade-in 0.3s ease-in forwards;
  @keyframes fade-in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;
