import styled from "styled-components";

export const Update = () => {
  return (
    <UpdateFormWrap>
      <Box>
        <Label>이름</Label>
        <InputBox>
          <DisabledInput>섬빔</DisabledInput>
        </InputBox>
      </Box>
      <Box>
        <Label>아이디</Label>
        <InputBox>
          <DisabledInput>mrcsbin2</DisabledInput>
        </InputBox>
      </Box>
      <Box>
        <Label>현재 비밀번호</Label>
        <InputBox>
          <Input type="password"></Input>
        </InputBox>
      </Box>
      <Box>
        <Label>새 비밀번호</Label>
        <InputBox>
          <Input
            type="password"
            placeholder="새 비밀번호"
            style={{ marginBottom: 25 }}
          ></Input>
          <Input type="password" placeholder="새 비밀번호 확인"></Input>
        </InputBox>
      </Box>
      <Box>
        <Label>별명</Label>
        <InputBox>
          <Input type="text"></Input>
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
            <Input></Input>
          </InputBox>
        </ProfileContainer>
      </Box>
      <Box>
        <Label>이메일</Label>
        <InputBox>
          <Input></Input>
        </InputBox>
      </Box>
      <ButtonBox>
        <UpdateButton>수정</UpdateButton>
      </ButtonBox>
      <ButtonBox>
        <WithdrawButton>회원탈퇴</WithdrawButton>
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

const DisabledInput = styled.div`
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
