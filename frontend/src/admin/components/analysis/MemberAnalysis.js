import styled from "styled-components";
import { MembershipTrend } from "./member/MembershipTrend";
import { useState } from "react";

export const MemberAnalysis = () => {
  const [activeTab, setActiveTab] = useState(30);
  const [dateType, setDateType] = useState(30);

  return (
    <>
      <HeaderWrap>
        <HeaderLeft>회원 통계</HeaderLeft>
        <HeaderRight>
          <Tab>설정</Tab>
          <Tab className={activeTab === 30 ? "active" : ""}>
            <TabName
              onClick={() => {
                setActiveTab(30);
                setDateType(30);
              }}
            >
              30일
            </TabName>
          </Tab>
          <Tab className={activeTab === 60 ? "active" : ""}>
            <TabName
              onClick={() => {
                setActiveTab(60);
                setDateType(60);
              }}
            >
              60일
            </TabName>
          </Tab>
        </HeaderRight>
      </HeaderWrap>
      <MembershipTrend dateType={dateType} />
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

const Tab = styled.div`
  /* margin-left: 20px; */
  width: 60px;
  text-align: center;
  position: relative;
  &.active {
    font-weight: bold;
  }
`;

const TabName = styled.span`
  cursor: pointer;
`;
