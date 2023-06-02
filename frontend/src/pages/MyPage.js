import styled from "styled-components";
import { Profile } from "../components/mypage/Profile";
import { Tab } from "../components/mypage/Tab";
import { Content } from "../components/mypage/Contents";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setActiveTab } from "../store/modules/mypage";

function MyPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    const setDefaultTab = async () => {
      await dispatch(setActiveTab("주문"));
    };

    // tabClickHandle를 이용한 초기 실행
    setDefaultTab();
  }, []);

  return (
    <MyPageWrap>
      <Profile />
      <ContentWrap>
        <Tab></Tab>
        <Content></Content>
      </ContentWrap>
    </MyPageWrap>
  );
}

export default MyPage;

const MyPageWrap = styled.div`
  width: 100%;
  margin: 0px auto;
  box-sizing: border-box;
  padding-top: 105px;
`;

const ContentWrap = styled.div`
  display: flex;
`;
