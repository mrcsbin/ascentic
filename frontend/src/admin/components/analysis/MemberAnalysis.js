import styled from "styled-components";
import { MembershipTrend } from "./member/MembershipTrend";

export const MemberAnalysis = () => {
  return (
    <>
      <HeaderWrap>
        <HeaderLeft>회원 통계</HeaderLeft>
        <HeaderRight></HeaderRight>
      </HeaderWrap>
      <MembershipTrend />
    </>
  );
};

const HeaderWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin: 0 auto;
  padding-top: 50px;
  border-bottom: 2px solid black;
`;

const HeaderLeft = styled.div`
  padding: 20px 0;
  font-size: 30px;
  font-weight: 700;
`;

const HeaderRight = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: end;
`;

const SubTab = styled.div`
  display: none;
  position: absolute;
  width: 100%;
  z-index: 10;
`;

const SubTabName = styled.div`
  font-weight: 400;
  padding: 10px 0;
  &.active {
    font-weight: bold;
  }
  &:hover {
    font-weight: bold;
  }
`;

const Tab = styled.div`
  /* margin-left: 20px; */
  width: 100px;
  text-align: center;
  position: relative;
  cursor: pointer;
  &.active {
    font-weight: bold;
  }
  &:hover {
    font-weight: bold;
  }
  &:hover ${SubTab} {
    display: block;
  }
`;

const TabName = styled.div``;
