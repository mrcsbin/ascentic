import { useState } from "react";
import styled, { css } from "styled-components";

export const Notification = () => {
  const [emailPushYn, setEmailPushYn] = useState(false);
  const [snsPushYn, setSnsPushYn] = useState(false);

  console.log(emailPushYn);

  return (
    <Wrap>
      <ContentHeader>알림 설정</ContentHeader>
      <ContentBody>
        <Header>이벤트 및 혜택 알림</Header>
        <Container>
          <SettingBox>
            <TitleBox>
              <Title>이메일</Title>
            </TitleBox>
            <OnOffButtonBox>
              <OnOffButton
                type="checkbox"
                checked={emailPushYn}
                onChange={(e) => setEmailPushYn(e.target.checked)}
              ></OnOffButton>
              <OnOff isChecked={emailPushYn} />
            </OnOffButtonBox>
          </SettingBox>
          <SettingBox>
            <TitleBox>
              <Title>휴대폰</Title>
            </TitleBox>
            <OnOffButtonBox>
              <OnOffButton
                type="checkbox"
                checked={snsPushYn}
                onChange={(e) => setSnsPushYn(e.target.checked)}
              ></OnOffButton>
              <OnOff isChecked={snsPushYn} />
            </OnOffButtonBox>
          </SettingBox>
        </Container>
      </ContentBody>
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

const ContentBody = styled.div`
  padding: 50px;
  box-sizing: border-box;
`;

const Header = styled.div`
  font-size: 30px;
  margin-bottom: 40px;
`;

const Container = styled.div`
  padding: 20px 40px;
  border: 1px solid grey;
`;

const SettingBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
`;

const TitleBox = styled.div``;

const Title = styled.div`
  font-size: 18px;
  font-weight: 700;
`;

const OnOffButtonBox = styled.div`
  position: relative;
`;

const OnOffButton = styled.input`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  margin: 0px;
  padding: 0px;
  opacity: 0;
  box-sizing: border-box;
  z-index: 1;
  cursor: pointer;
`;

const OnOff = styled.div`
  ${(props) =>
    props.isChecked &&
    css`
      display: inline-block;
      position: relative;
      width: 51px;
      height: 31px;
      border-radius: 30px;
      cursor: pointer;
      transition: opacity 0.1s ease 0s, background-color 0.2s ease 0s;
      background-color: rgb(0, 0, 0);
      ::before {
        transform: translateX(20px);
        content: "";
        display: block;
        position: absolute;
        top: 2px;
        left: 2px;
        width: 27px;
        height: 27px;
        box-sizing: border-box;
        background-color: rgb(255, 255, 255);
        border-radius: 100%;
        border: 0.5px solid rgba(0, 0, 0, 0.04);
        box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 8px,
          rgba(0, 0, 0, 0.06) 0px 3px 1px;
        transition: transform 0.2s ease 0s;
      }
    `}

  ${(props) =>
    !props.isChecked &&
    css`
      display: inline-block;
      position: relative;
      width: 51px;
      height: 31px;
      background-color: rgba(120, 120, 128, 0.16);
      border-radius: 30px;
      cursor: pointer;
      transition: opacity 0.1s ease 0s, background-color 0.2s ease 0s;
      ::before {
        content: "";
        display: block;
        position: absolute;
        top: 2px;
        left: 2px;
        width: 27px;
        height: 27px;
        box-sizing: border-box;
        background-color: rgb(255, 255, 255);
        border-radius: 100%;
        border: 0.5px solid rgba(0, 0, 0, 0.04);
        box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 8px,
          rgba(0, 0, 0, 0.06) 0px 3px 1px;
        transition: transform 0.2s ease 0s;
      }
    `}
`;
