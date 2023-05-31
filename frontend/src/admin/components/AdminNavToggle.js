import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import DROP_UP from "../../assets/admin/drop-up.png";
import DROP_DOWN from "../../assets/admin/drop-down.png";

export const AdminNavToggle = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(null);
  const [activeSubTab, setActiveSubTab] = useState(null);

  const handleTabClick = (tab) => {
    if (activeTab === tab) {
      setActiveTab(null);
    } else {
      setActiveTab(tab);
    }
  };

  if (!location.pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <Wrap>
      <LinkBox>
        <LinkToMain to="/">&lt; 메인페이지로 돌아가기</LinkToMain>
      </LinkBox>
      <LinkToMenu to="/admin">
        <Header
          onClick={() => {
            setActiveTab(null);
            setActiveSubTab(null);
          }}
        >
          관리자 페이지
        </Header>
      </LinkToMenu>
      <ToggleMenuBox className={activeTab === "통계" ? "active" : ""}>
        <ToggleMenuHeader onClick={() => handleTabClick("통계")}>
          <ToggleMenu>통계</ToggleMenu>
          <ToggleMenuIcon
            src={activeTab === "통계" ? DROP_UP : DROP_DOWN}
            alt="토글 아이콘"
          />
        </ToggleMenuHeader>
        {activeTab === "통계" && (
          <MenuBox>
            <SubMenuBox>
              <LinkToMenu to="/admin/analysis/product">
                <SubMenu
                  className={activeSubTab === "상품 매출 통계" ? "active" : ""}
                  onClick={() => setActiveSubTab("상품 매출 통계")}
                >
                  상품 매출 통계
                </SubMenu>
              </LinkToMenu>
            </SubMenuBox>
            <SubMenuBox>
              <LinkToMenu to="/admin/analysis/member">
                <SubMenu
                  className={activeSubTab === "회원 통계" ? "active" : ""}
                  onClick={() => setActiveSubTab("회원 통계")}
                >
                  회원 통계
                </SubMenu>
              </LinkToMenu>
            </SubMenuBox>
            <SubMenuBox>
              <LinkToMenu to="/admin/analysis/subscribe">
                <SubMenu
                  className={activeSubTab === "구독 통계" ? "active" : ""}
                  onClick={() => setActiveSubTab("구독 통계")}
                >
                  구독 통계
                </SubMenu>
              </LinkToMenu>
            </SubMenuBox>
          </MenuBox>
        )}
      </ToggleMenuBox>
      <ToggleMenuBox className={activeTab === "고객서비스" ? "active" : ""}>
        <ToggleMenuHeader onClick={() => handleTabClick("고객서비스")}>
          <ToggleMenu>고객서비스</ToggleMenu>
          <ToggleMenuIcon
            src={activeTab === "고객서비스" ? DROP_UP : DROP_DOWN}
            alt="토글 아이콘"
          />
        </ToggleMenuHeader>
        {activeTab === "고객서비스" && (
          <MenuBox>
            <SubMenuBox>
              <LinkToMenu to="/admin/customerservice/new">
                <SubMenu
                  className={activeSubTab === "미답변 문의" ? "active" : ""}
                  onClick={() => setActiveSubTab("미답변 문의")}
                >
                  미답변 문의
                </SubMenu>
              </LinkToMenu>
            </SubMenuBox>
            <SubMenuBox>
              <LinkToMenu to="/admin/customerservice/all">
                <SubMenu
                  className={activeSubTab === "답변 내역" ? "active" : ""}
                  onClick={() => setActiveSubTab("답변 내역")}
                >
                  답변 내역
                </SubMenu>
              </LinkToMenu>
            </SubMenuBox>
          </MenuBox>
        )}
      </ToggleMenuBox>
      <ToggleMenuBox className={activeTab === "이벤트 및 뉴스" ? "active" : ""}>
        <ToggleMenuHeader onClick={() => handleTabClick("이벤트 및 뉴스")}>
          <ToggleMenu>이벤트 및 뉴스</ToggleMenu>
          <ToggleMenuIcon
            src={activeTab === "이벤트 및 뉴스" ? DROP_UP : DROP_DOWN}
            alt="토글 아이콘"
          />
        </ToggleMenuHeader>
        {activeTab === "이벤트 및 뉴스" && (
          <MenuBox>
            <SubMenuBox>
              <LinkToMenu to="/admin/eventnews/event">
                <SubMenu
                  className={activeSubTab === "이벤트" ? "active" : ""}
                  onClick={() => setActiveSubTab("이벤트")}
                >
                  이벤트
                </SubMenu>
              </LinkToMenu>
            </SubMenuBox>
            <SubMenuBox>
              <LinkToMenu to="/admin/eventnews/news">
                <SubMenu
                  className={activeSubTab === "뉴스" ? "active" : ""}
                  onClick={() => setActiveSubTab("뉴스")}
                >
                  뉴스
                </SubMenu>
              </LinkToMenu>
            </SubMenuBox>
            <SubMenuBox>
              <LinkToMenu to="/admin/eventnews/post">
                <SubMenu
                  className={activeSubTab === "글작성" ? "active" : ""}
                  onClick={() => setActiveSubTab("글작성")}
                >
                  글작성
                </SubMenu>
              </LinkToMenu>
            </SubMenuBox>
          </MenuBox>
        )}
      </ToggleMenuBox>
      <ToggleMenuBox className={activeTab === "회원 관리" ? "active" : ""}>
        <ToggleMenuHeader onClick={() => handleTabClick("회원 관리")}>
          <ToggleMenu>회원 관리</ToggleMenu>
          <ToggleMenuIcon
            src={activeTab === "회원 관리" ? DROP_UP : DROP_DOWN}
            alt="토글 아이콘"
          />
        </ToggleMenuHeader>
        {activeTab === "회원 관리" && (
          <MenuBox>
            <SubMenuBox>
              <LinkToMenu to="/admin/membermanagement">
                <SubMenu
                  className={activeSubTab === "회원 목록" ? "active" : ""}
                  onClick={() => setActiveSubTab("회원 목록")}
                >
                  회원 목록
                </SubMenu>
              </LinkToMenu>
            </SubMenuBox>
            <SubMenuBox>
              <LinkToMenu to="/admin/membermanagement">
                <SubMenu
                  className={activeSubTab === "회원 관리" ? "active" : ""}
                  onClick={() => setActiveSubTab("회원 관리")}
                >
                  회원 관리
                </SubMenu>
              </LinkToMenu>
            </SubMenuBox>
          </MenuBox>
        )}
      </ToggleMenuBox>
      <ToggleMenuBox className={activeTab === "상품 관리" ? "active" : ""}>
        <ToggleMenuHeader onClick={() => handleTabClick("상품 관리")}>
          <ToggleMenu>상품 관리</ToggleMenu>
          <ToggleMenuIcon
            src={activeTab === "상품 관리" ? DROP_UP : DROP_DOWN}
            alt="토글 아이콘"
          />
        </ToggleMenuHeader>
        {activeTab === "상품 관리" && (
          <MenuBox>
            <SubMenuBox>
              <LinkToMenu to="/admin/storemanagement/list">
                <SubMenu
                  className={activeSubTab === "상품 목록" ? "active" : ""}
                  onClick={() => setActiveSubTab("상품 목록")}
                >
                  상품 목록
                </SubMenu>
              </LinkToMenu>
            </SubMenuBox>
            <SubMenuBox>
              <LinkToMenu to="/admin/storemanagement/post">
                <SubMenu
                  className={activeSubTab === "상품 추가" ? "active" : ""}
                  onClick={() => setActiveSubTab("상품 추가")}
                >
                  상품 추가
                </SubMenu>
              </LinkToMenu>
            </SubMenuBox>
          </MenuBox>
        )}
      </ToggleMenuBox>
      <ToggleMenuBox className={activeTab === "구독 관리" ? "active" : ""}>
        <ToggleMenuHeader onClick={() => handleTabClick("구독 관리")}>
          <ToggleMenu>구독 관리</ToggleMenu>
          <ToggleMenuIcon
            src={activeTab === "구독 관리" ? DROP_UP : DROP_DOWN}
            alt="토글 아이콘"
          />
        </ToggleMenuHeader>
        {activeTab === "구독 관리" && (
          <MenuBox>
            <SubMenuBox>
              <LinkToMenu to="/admin/subscribemanagement/member">
                <SubMenu
                  className={activeSubTab === "구독 회원 관리" ? "active" : ""}
                  onClick={() => setActiveSubTab("구독 회원 관리")}
                >
                  구독 회원 관리
                </SubMenu>
              </LinkToMenu>
            </SubMenuBox>
            <SubMenuBox>
              <LinkToMenu to="/admin/subscribemanagement/product">
                <SubMenu
                  className={activeSubTab === "구독 상품 관리" ? "active" : ""}
                  onClick={() => setActiveSubTab("구독 상품 관리")}
                >
                  구독 상품 관리
                </SubMenu>
              </LinkToMenu>
            </SubMenuBox>
          </MenuBox>
        )}
      </ToggleMenuBox>
    </Wrap>
  );
};

const Wrap = styled.div`
  position: fixed;
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

const LinkToMenu = styled(Link)`
  text-decoration: none;
  color: black;
`;

const ToggleMenuHeader = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
`;

const ToggleMenu = styled.div``;

const ToggleMenuIcon = styled.img`
  width: 16px;
  height: 16px;
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

const SubMenuBox = styled.div`
  font-size: 1.1rem;
  text-align: left;
  padding-left: 10px;
  margin-top: 25px;
  font-weight: 400;

  opacity: 1;
  ${ToggleMenuBox}.active & {
    animation: ${fadeInAnimation} 0.4s ease-in-out;
  }
`;

const SubMenu = styled.span`
  cursor: pointer;
  &.active {
    font-weight: 900;
  }
`;
