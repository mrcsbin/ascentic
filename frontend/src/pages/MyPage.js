import styled from "styled-components";
import { Profile } from "../components/mypage/Profile";
import { Tab } from "../components/mypage/Tab";
import { Content } from "../components/mypage/Contents";

function MyPage() {
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
`;

const ContentWrap = styled.div`
  display: flex;
`;
