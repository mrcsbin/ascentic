import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import DROP_UP from "../../assets/drop-up.png";
import DROP_DOWN from "../../assets/drop-down.png";

export const AdminNavToggle = () => {
  const [activeTab, setActiveTab] = useState(null);

  const handleTabClick = (tab) => {
    if (activeTab === tab) {
      setActiveTab(null);
    } else {
      setActiveTab(tab);
    }
  };

  return (
    <Wrap>
      <LinkBox>
        <LinkToMain to="/">&lt; 메인페이지로</LinkToMain>
      </LinkBox>
      <Header>관리자 페이지</Header>
      <ToggleMenuBox
        onClick={() => handleTabClick("통계")}
        className={activeTab === "통계" ? "active" : ""}
      >
        <ToggleMenuHeader>
          <ToggleMenu>통계</ToggleMenu>
          <ToggleMenuIcon
            src={activeTab === "통계" ? DROP_UP : DROP_DOWN}
            alt="토글 아이콘"
          />
        </ToggleMenuHeader>
        {activeTab === "통계" && (
          <MenuBox>
            <SubMenu>상품 매출 통계</SubMenu>
            <SubMenu>회원 통계</SubMenu>
            <SubMenu>구독 통계</SubMenu>
          </MenuBox>
        )}
      </ToggleMenuBox>
      <ToggleMenuBox
        onClick={() => handleTabClick("고객서비스")}
        className={activeTab === "고객서비스" ? "active" : ""}
      >
        <ToggleMenuHeader>
          <ToggleMenu>고객서비스</ToggleMenu>
          <ToggleMenuIcon
            src={activeTab === "고객서비스" ? DROP_UP : DROP_DOWN}
            alt="토글 아이콘"
          />
        </ToggleMenuHeader>
        {activeTab === "고객서비스" && (
          <MenuBox>
            <SubMenu>고객 문의</SubMenu>
            <SubMenu>상담 내역</SubMenu>
            <SubMenu>문의 답변</SubMenu>
          </MenuBox>
        )}
      </ToggleMenuBox>
      <ToggleMenuBox
        onClick={() => handleTabClick("이벤트 및 뉴스")}
        className={activeTab === "이벤트 및 뉴스" ? "active" : ""}
      >
        <ToggleMenuHeader>
          <ToggleMenu>이벤트 및 뉴스</ToggleMenu>
          <ToggleMenuIcon
            src={activeTab === "이벤트 및 뉴스" ? DROP_UP : DROP_DOWN}
            alt="토글 아이콘"
          />
        </ToggleMenuHeader>
        {activeTab === "이벤트 및 뉴스" && (
          <MenuBox>
            <SubMenu>이벤트</SubMenu>
            <SubMenu>뉴스(공지사항?)</SubMenu>
          </MenuBox>
        )}
      </ToggleMenuBox>
      <ToggleMenuBox
        onClick={() => handleTabClick("회원 관리")}
        className={activeTab === "회원 관리" ? "active" : ""}
      >
        <ToggleMenuHeader>
          <ToggleMenu>회원 관리</ToggleMenu>
          <ToggleMenuIcon
            src={activeTab === "회원 관리" ? DROP_UP : DROP_DOWN}
            alt="토글 아이콘"
          />
        </ToggleMenuHeader>
        {activeTab === "회원 관리" && (
          <MenuBox>
            <SubMenu>회원 목록</SubMenu>
            <SubMenu>회원 관리</SubMenu>
          </MenuBox>
        )}
      </ToggleMenuBox>
      <ToggleMenuBox
        onClick={() => handleTabClick("상품 관리")}
        className={activeTab === "상품 관리" ? "active" : ""}
      >
        <ToggleMenuHeader>
          <ToggleMenu>상품 관리</ToggleMenu>
          <ToggleMenuIcon
            src={activeTab === "상품 관리" ? DROP_UP : DROP_DOWN}
            alt="토글 아이콘"
          />
        </ToggleMenuHeader>
        {activeTab === "상품 관리" && (
          <MenuBox>
            <SubMenu>상품 목록</SubMenu>
            <SubMenu>상품 추가</SubMenu>
          </MenuBox>
        )}
      </ToggleMenuBox>
      <ToggleMenuBox
        onClick={() => handleTabClick("구독 관리")}
        className={activeTab === "구독 관리" ? "active" : ""}
      >
        <ToggleMenuHeader>
          <ToggleMenu>구독 관리</ToggleMenu>
          <ToggleMenuIcon
            src={activeTab === "구독 관리" ? DROP_UP : DROP_DOWN}
            alt="토글 아이콘"
          />
        </ToggleMenuHeader>
        {activeTab === "구독 관리" && (
          <MenuBox>
            <SubMenu>구독 회원 관리</SubMenu>
            <SubMenu>구독 상품 관리</SubMenu>
          </MenuBox>
        )}
      </ToggleMenuBox>
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 15%;
  height: 100vh;
  background-color: #f8f9fa;
  padding: 0%;
  display: block;
  float: left;
  box-sizing: border-box;
  padding: 15px 0;
`;

const LinkBox = styled.div`
  width: 100%;
`;

const LinkToMain = styled(Link)`
  font-size: 1rem;
  width: 100%;
  margin: 0 10%;
  color: black;
  text-decoration: none;
`;

const Header = styled.div`
  font-size: 1.8rem;
  font-weight: 500;
  width: 100%;
  text-align: center;
  margin: 2.5rem auto;
`;

const fadeInAnimation = keyframes`
  from {
    opacity: 0;
    max-height: 0;
  }
  to {
    opacity: 1;
    max-height: 500px;
  }
`;

const ToggleMenuBox = styled.div`
  cursor: pointer;
  display: block;
  color: #212529;
  text-decoration: none;
  padding: 8px 16px;
  margin: 20px 0;
  font-size: 1.3rem;
  &.active {
    font-weight: 900;
  }
`;

const ToggleMenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ToggleMenu = styled.div``;

const ToggleMenuIcon = styled.img`
  width: 15px;
  height: 15px;
`;

const MenuBox = styled.div`
  font-size: 1rem;
  max-height: 0;
  overflow: hidden;
  transition: max-height 1s ease-in-out;
  ${ToggleMenuBox}.active & {
    max-height: 500px;
  }
`;

const SubMenu = styled.div`
  font-size: 1.1rem;
  text-align: left;
  padding-left: 10px;
  margin-top: 20px;
  font-weight: 400;

  opacity: 1;
  ${ToggleMenuBox}.active & {
    animation: ${fadeInAnimation} 0.4s ease-in-out;
  }
`;
