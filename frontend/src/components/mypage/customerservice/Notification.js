import { useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { getCookie } from "../../../utils/Cookies";
import { useEffect } from "react";
import { getMemberInfo, updatePushYn } from "../../../api/MemberApi";
import { useDispatch } from "react-redux";
import { setActiveTab } from "../../../store/modules/mypage";

export const Notification = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [emailPushYn, setEmailPushYn] = useState();
  const [snsPushYn, setSnsPushYn] = useState();
  const dispatch = useDispatch();
  const accessToken = getCookie("accessToken");

  useEffect(() => {
    const fetchMemberInfo = async () => {
      const accessToken = getCookie("accessToken");
      const getInfo = await getMemberInfo(accessToken);
      setEmailPushYn(getInfo.emailPushYn);
      setSnsPushYn(getInfo.snsPushYn);
      dispatch(setActiveTab("알림 설정"));
    };
    fetchMemberInfo();
  }, [dispatch]);

  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showNotification]);

  const changeEmailHandle = async (e) => {
    const newEmailYn = e.target.checked;
    setEmailPushYn(newEmailYn);
    await updatePushYn(accessToken, snsPushYn, newEmailYn).then(() => {
      setShowNotification(true);
    });
  };

  const changeSnsHandle = async (e) => {
    const newSnsPushYn = e.target.checked;
    setSnsPushYn(newSnsPushYn);
    await updatePushYn(accessToken, newSnsPushYn, emailPushYn).then(() => {
      setShowNotification(true);
    });
  };

  return (
    <>
      <Wrap>
        <ContentHeader>알림 설정</ContentHeader>
        <ContentBody>
          <Header>이벤트 및 혜택 알림</Header>
          <SubTitle>진행중인 이벤트 정보를 빠르게 알려드려요.</SubTitle>
          <Container>
            <SettingBox>
              <TitleBox>
                <Title>이메일</Title>
              </TitleBox>
              <OnOffButtonBox>
                <OnOffButton
                  type="checkbox"
                  checked={emailPushYn}
                  onChange={(e) => changeEmailHandle(e)}
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
                  onChange={(e) => changeSnsHandle(e)}
                ></OnOffButton>
                <OnOff isChecked={snsPushYn} />
              </OnOffButtonBox>
            </SettingBox>
          </Container>
        </ContentBody>
      </Wrap>
      {showNotification && (
        <NotificationContainer>
          <NotificationText>저장되었습니다.</NotificationText>
        </NotificationContainer>
      )}
    </>
  );
};

const Wrap = styled.div`
  // border-bottom: 2px solid black;
`;

const ContentHeader = styled.div`
  padding: 0px 0px 20px 0;
  font-size: 1.8rem;
  font-weight: 700;
  border-bottom: 1px solid grey;
`;

const ContentBody = styled.div`
  padding: 80px;
  box-sizing: border-box;
`;

const Header = styled.div`
  font-size: 2rem;
  margin-bottom: 40px;
`;

const SubTitle = styled.div`
  font-size: 1.2rem;
  margin-bottom: 20px;
`;

const Container = styled.div`
  padding: 10px 40px;
  border: 1px solid grey;
  border-radius: 8px;
`;

const SettingBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 40px 0;
`;

const TitleBox = styled.div``;

const Title = styled.div`
  font-size: 1.3rem;
  font-weight: 600;
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

const slideUp = keyframes`
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const NotificationContainer = styled.div`
  position: fixed;
  bottom: 150px;
  left: 46%;
  padding: 10px 20px;
  background-color: black;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  animation: ${slideUp} 0.3s ease-in-out, ${fadeOut} 1.5s 1s forwards;
`;

const NotificationText = styled.p`
  margin: 0;
  padding: 20 20px;
  font-size: 1.3rem;
  color: white;
`;
