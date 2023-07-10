import styled from "styled-components";
import { SubscribeMemberPerMember } from "./subscribe/SubscribeMemberPerMember";
import { SubscribeProductScore } from "./subscribe/SubscribeProductScore";
import { useState } from "react";

export const SubscribeAnalysis = () => {
  const [activeTab, setActiveTab] = useState("회원");

  return (
    <>
      <HeaderWrap>
        <HeaderLeft>구독 통계</HeaderLeft>
        <HeaderRight>
          <Tab>설정</Tab>
          <Tab className={activeTab === "회원" ? "active" : ""}>
            <TabName
              onClick={() => {
                setActiveTab("회원");
              }}
            >
              회원
            </TabName>
          </Tab>
          <Tab className={activeTab === "상품" ? "active" : ""}>
            <TabName
              onClick={() => {
                setActiveTab("상품");
              }}
            >
              상품
            </TabName>
          </Tab>
        </HeaderRight>
      </HeaderWrap>
      {activeTab === "회원" && <SubscribeMemberPerMember />}
      {activeTab === "상품" && <SubscribeProductScore />}
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
  font-weight: 600;
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
