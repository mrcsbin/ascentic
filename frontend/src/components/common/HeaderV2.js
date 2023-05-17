import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { Link, useNavigate, useLocation } from "react-router-dom";
import iconUser from "../../assets/iconUser.svg";
import iconBag from "../../assets/iconBag.svg";
import iconSearch from "../../assets/iconSearch.svg";
import LOGOUT_ICON from "../../assets/logout.png";
import "../../styles/Header.css";
import { getCookie, removeCookie } from "../../utils/Cookies";
import Loading from "./Loading";
import { useSelector, useDispatch } from "react-redux";
import { setIsLogin } from "../../store/modules/login";
import arrow from "../../assets/menu_arrow.svg";

//HSM
//RouteTest.js 에 임시로 연결

const HeaderV2 = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.login.isLogin);
  const location = useLocation();
  const [hoverMenu, setHoverMenu] = useState("");

  // 검색창
  const [showSearch, setShowSearch] = useState(false);
  // 소메뉴 펼치기
  const [showMenu1, setShowMenu1] = useState(false);
  // 검색창 켜기
  const handleshowSearch = () => {
    setShowSearch(true);
  };
  // 검색창 끄기
  const handlehideSearch = () => {
    setShowSearch(false);
  };

  function handleLogout() {
    removeCookie("accessToken");
    dispatch(setIsLogin(false));
    navigate("/", { replace: true });
  }

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = getCookie("accessToken");
      if (token) {
        await dispatch(setIsLogin(true));
      }
    };
    checkLoginStatus();
  }, [dispatch]);
  if (location.pathname.startsWith("/admin")) return null;

  return (
    <Wrap className="header-wrap">
      <TopContainer>
        <LeftBox></LeftBox>
        <CenterBox>
          <StyledLink to="/">[a]scentic</StyledLink>
        </CenterBox>
        <RightBox>
          <IconBox>
            <Icon
              src={iconSearch}
              alt="iconSearch"
              onClick={handleshowSearch}
              style={{ cursor: "pointer" }}
            ></Icon>
          </IconBox>
          <IconBox>
            <StyledLink to="/login">
              <Icon src={iconUser} alt="iconMyPage"></Icon>
            </StyledLink>
          </IconBox>
          <IconBox>
            <StyledLink to="/cart">
              <Icon src={iconBag} alt="iconBag"></Icon>
            </StyledLink>
          </IconBox>
          {isLoggedIn ? (
            <IconBox>
              <StyledLink to="/">
                <Icon
                  src={LOGOUT_ICON}
                  alt="로그아웃"
                  onClick={handleLogout}
                ></Icon>
              </StyledLink>
            </IconBox>
          ) : null}
        </RightBox>
      </TopContainer>

      <MenuContainer>
        <MenuBox>
          <StyledLink to="/storemain" onMouseEnter={() => setHoverMenu("체험")}>
            <Menu>체 험</Menu>
          </StyledLink>
        </MenuBox>
        <MenuBox>
          <StyledLink to="/storemain">
            <Menu>스 토 어</Menu>
          </StyledLink>
        </MenuBox>
        <MenuBox>
          <StyledLink to="/proddetail">
            <Menu>커 뮤 니 티</Menu>
          </StyledLink>
        </MenuBox>
      </MenuContainer>

      <ExpSubMenuContainer
        isMenuHovered={hoverMenu === "체험"}
        onMouseLeave={() => setHoverMenu("")}
      >
        <CategoryBox>
          <CategoryItem>
            <StyledLink to="/">
              <SubMenu>구독 소개</SubMenu>
            </StyledLink>
          </CategoryItem>
          <CategoryItem>
            <StyledLink to="/">
              <SubMenu>취향 테스트</SubMenu>
            </StyledLink>
          </CategoryItem>
          <CategoryItem>
            <StyledLink to="/">
              <SubMenu>구독 신청</SubMenu>
            </StyledLink>
          </CategoryItem>
          <CategoryItem>
            <StyledLink to="/">
              <SubMenu>구독 관리</SubMenu>
            </StyledLink>
          </CategoryItem>
        </CategoryBox>
      </ExpSubMenuContainer>
      {showSearch && (
        <div className="search">
          <div className="search-wrap">
            <form>
              <input
                type="text"
                name="search"
                placeholder="원하는 향을 검색하세요."
                minLength="1"
                maxLength="10"
              ></input>
              <button type="submit" class="search-img">
                <img
                  src={iconSearch}
                  alt="iconSearch"
                  style={{ cursor: "pointer" }}
                ></img>
              </button>
              <button className="close-btn" onClick={handlehideSearch}>
                닫기
              </button>
            </form>
          </div>
        </div>
      )}
    </Wrap>
  );
};

export default HeaderV2;

const Wrap = styled.div`
  position: relative;
  height: 170px;
`;

const TopContainer = styled.div`
  padding: 0 5%;
  display: flex;
`;

const LeftBox = styled.div`
  margin: 15px auto;
  width: 25%;
`;

const CenterBox = styled.div`
  margin: 15px auto;
  font-weight: bold;
  font-size: 40px;
  text-align: center;
  width: 50%;
`;

const RightBox = styled.div`
  margin: 15px auto;
  width: 25%;
  display: flex;
  justify-content: end;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

const IconBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
  padding: 0px 15px;
`;

const Icon = styled.img`
  width: 25px;
`;

const MenuContainer = styled.div`
  margin: 5px 0;
  display: flex;
  font-size: 18px;
  justify-content: center;
`;

const MenuBox = styled.div`
  padding: 0px 30px;
`;

const Menu = styled.div``;

const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-40px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ExpSubMenuContainer = styled.div`
  z-index: 1;
  box-sizing: border-box;
  padding: 20px 0px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  border-top: 1px solid rgba(0, 0, 0, 0.3);
  display: none;
  animation: ${fadeIn} 1s forwards;

  ${(props) =>
    props.isMenuHovered &&
    `
  display: block;
  opacity: 1;
  transform: translateY(0);
  visibility: visible;
`};
`;

const CategoryBox = styled.div`
  margin: 0 auto;
  width: 30%;
  display: flex;
  justify-content: space-evenly;
  text-decoration: none;
`;

const CategoryItem = styled.div``;

const SubMenu = styled.div`
  font-size: 15px;
`;
