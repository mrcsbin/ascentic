import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import iconUser from '../../assets/iconUser.svg';
import iconBag from '../../assets/iconBag.svg';
import logoW from '../../assets/logoW.svg';
import logoB from '../../assets/logoB.svg';
import iconSearch from '../../assets/iconSearch.svg';
import LOGOUT_ICON from '../../assets/logout.png';
import '../../styles/Header.css';
import { getCookie, removeCookie } from '../../utils/Cookies';
import Loading from './Loading';
import { useSelector, useDispatch } from 'react-redux';
import { setIsLogin } from '../../store/modules/login';
import arrow from '../../assets/menu_arrow.svg';
import Notice from './Notice';
import { Search } from './Search';
import { getCartCount } from '../../api/CartApi';
import { fetchCartItems } from '../../store/modules/cart';

//HSM
//RouteTest.js 에 임시로 연결

const HeaderV2 = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.login.isLogin);
  const role = useSelector((state) => state.login.role);
  const location = useLocation();
  const [hoverMenu, setHoverMenu] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  // 검색창
  const [showSearch, setShowSearch] = useState(false);

  // 소메뉴 펼치기
  const [showMenu1, setShowMenu1] = useState(false);
  // 검색창 켜기
  const [scrollPosition, setScrollPosition] = useState(0);
  const updateScroll = () => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  };
  useEffect(() => {
    window.addEventListener('scroll', updateScroll);
  });
  const handleShowSearch = () => {
    setShowSearch(true);
  };
  // 검색창 끄기
  const handleHideSearch = () => {
    setShowSearch(false);
  };

  // 로그아웃 => 로그아웃 하면 메인페이지로 가진 후 새로고침
  function handleLogout() {
    removeCookie('accessToken');
    dispatch(setIsLogin(false));
    navigate('/', { replace: true });
    window.location.reload();
  }

  useEffect(() => {
    if (location.pathname.startsWith('/exp')) {
      setIsDarkMode(true);

      if (
        location.pathname.startsWith('/exp/taste/res') |
        location.pathname.startsWith('/exp/subsmanage')
      ) {
        setIsDarkMode(false);
      }
    } else {
      setIsDarkMode(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = getCookie('accessToken');
      if (token) {
        await dispatch(setIsLogin(true));
        dispatch(fetchCartItems());
      }
    };
    checkLoginStatus();
  }, [dispatch]);

  // 카트 개수 가져오기
  const cartCount = useSelector((state) => state.cart.cartItem.length);
  // useEffect(() => {
  //   dispatch(fetchCartItems());
  // }, [dispatch]);

  const logoSrc = isDarkMode ? logoW : logoB;
  if (location.pathname.startsWith('/admin')) return null;
  if (location.pathname.startsWith('/NotFound')) return null;
  //isDarkMode leftBox CenterBox RightBox 단에서 props로 주니까 보라색으로 이상하게 바뀜요,,, 그래서 styledLink로,,
  return (
    <div className="NoticeHeader">
      <Notice />
      <Wrap
        className={`header-wrap-${
          scrollPosition < 100 ? 'original-header' : 'change-header'
        } ${hoverMenu !== '' ? 'onHover' : 'notHover'}`}
        isDarkMode={isDarkMode}
      >
        <TopContainer>
          <LeftBox>
            <StyledLink to="/" isDarkMode={isDarkMode}>
              <Logo src={logoSrc} alt="logoImg" />
            </StyledLink>
          </LeftBox>
          <CenterBox>
            <MenuContainer>
              <MenuBox>
                <StyledLink
                  to="/exp"
                  isDarkMode={isDarkMode}
                  onMouseEnter={() => {
                    setHoverMenu('체험');
                  }}
                >
                  <Menu>체 험</Menu>
                </StyledLink>
              </MenuBox>
              <MenuBox>
                <StyledLink to="/StoreMain/" isDarkMode={isDarkMode}>
                  <Menu>스 토 어</Menu>
                </StyledLink>
              </MenuBox>
              <MenuBox>
                <StyledLink
                  isDarkMode={isDarkMode}
                  to="/"
                  onMouseEnter={() => setHoverMenu('커뮤니티')}
                >
                  <Menu>커 뮤 니 티</Menu>
                </StyledLink>
              </MenuBox>
            </MenuContainer>

            <ExpSubMenuContainer
              isMenuHovered={hoverMenu === '체험'}
              onMouseLeave={() => setHoverMenu('')}
              isDarkMode={isDarkMode}
            >
              <CategoryBox>
                <CategoryItem>
                  <StyledLink to="/exp/" isDarkMode={isDarkMode}>
                    <SubMenu>구독 소개</SubMenu>
                  </StyledLink>
                </CategoryItem>
                <CategoryItem>
                  <StyledLink to="/exp/taste/" isDarkMode={isDarkMode}>
                    <SubMenu>취향 테스트</SubMenu>
                  </StyledLink>
                </CategoryItem>
                <CategoryItem>
                  <StyledLink to="/exp/subs/" isDarkMode={isDarkMode}>
                    <SubMenu>구독 신청</SubMenu>
                  </StyledLink>
                </CategoryItem>
                <CategoryItem>
                  <StyledLink to="/exp/subsmanage/" isDarkMode={isDarkMode}>
                    <SubMenu>구독 관리</SubMenu>
                  </StyledLink>
                </CategoryItem>
              </CategoryBox>
            </ExpSubMenuContainer>

            <CommunitySubMenuContainer
              isMenuHovered={hoverMenu === '커뮤니티'}
              onMouseLeave={() => setHoverMenu('')}
              isDarkMode={isDarkMode}
            >
              <CategoryBox>
                <CategoryItem>
                  <StyledLink to="community/notice" isDarkMode={isDarkMode}>
                    <SubMenu>공지사항</SubMenu>
                  </StyledLink>
                </CategoryItem>
                <CategoryItem>
                  <StyledLink to="/community/event/" isDarkMode={isDarkMode}>
                    <SubMenu>이벤트</SubMenu>
                  </StyledLink>
                </CategoryItem>
                <CategoryItem>
                  <StyledLink to="/" isDarkMode={isDarkMode}>
                    <SubMenu>게시판</SubMenu>
                  </StyledLink>
                </CategoryItem>
              </CategoryBox>
            </CommunitySubMenuContainer>
          </CenterBox>
          <RightBox isDarkMode={isDarkMode}>
            <IconBox>
              <Icon
                src={iconSearch}
                alt="iconSearch"
                onClick={handleShowSearch}
                style={{ cursor: 'pointer' }}
              ></Icon>
            </IconBox>
            <IconBox>
              <StyledLink
                to={
                  isLoggedIn
                    ? role === 'ADMIN'
                      ? '/admin'
                      : '/mypage/orderlist/'
                    : '/login'
                }
                isDarkMode={isDarkMode}
              >
                <Icon src={iconUser} alt="iconMyPage"></Icon>
              </StyledLink>
            </IconBox>
            <CartBox>
              <StyledLink to="/cart" isDarkMode={isDarkMode}>
                <Icon src={iconBag} alt="iconBag"></Icon>
                <CountBox>
                  <Count>{cartCount === 0 ? '' : cartCount}</Count>
                </CountBox>
              </StyledLink>
            </CartBox>
            {isLoggedIn ? (
              <IconBox>
                <StyledLink to="/" isDarkMode={isDarkMode}>
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

        {showSearch && <Search handleHideSearch={handleHideSearch} />}
      </Wrap>
    </div>
  );
};

export default HeaderV2;

const CountBox = styled.div`
  position: absolute;
  left: 30%;
  top: 30%;
  text-align: center;
`;

const Count = styled.div``;

const Wrap = styled.div`
  height: 75px;
  z-index: 999;
  width: 100%;
  font-weight: bold;

  &.onHover {
    height: 155px;
    transition: all 0.5s ease-in-out;
  }

  &.notHover {
    height: 75px;
    transition: all 0.5s ease-in-out;
  }
  &.header-wrap-original-header {
    background-color: rgba(0, 0, 0, 0);
  }

  &.header-wrap-change-header {
    background-color: ${({ isDarkMode }) =>
      isDarkMode ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.7)'};
  }
`;

const TopContainer = styled.div`
  padding: 0 5%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  align-content: flex-start;
`;

const LeftBox = styled.div`
  margin: 15px 0;
  width: 15%;
  font-weight: bold;
  font-size: 40px;
`;

const CenterBox = styled.div`
  margin: 15px auto;
  font-weight: bold;
  font-size: 40px;
  text-align: center;
  width: 45%;
`;

const RightBox = styled.div`
  margin: 20px 0;
  display: flex;
  filter: ${({ isDarkMode }) =>
    isDarkMode ? 'brightness(0) invert(1)' : 'none'};
`;
const Logo = styled.img`
  width: 150px;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${({ isDarkMode }) => (isDarkMode ? 'white;' : 'black;')};
`;

const CartBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
  margin: 0px 15px;
  position: relative;
`;

const IconBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
  margin: 0px 15px;
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
  padding: 10px 30px;
  text-align: center;
  width: 15%;
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
  margin-top: 17px;
  box-sizing: border-box;
  padding: 20px 0px;
  border-bottom: ${({ isDarkMode }) =>
    isDarkMode
      ? '1px solid rgba(255, 255, 255, 0.3)'
      : '1px solid rgba(0, 0, 0, 0.3)'};
  border-top: ${({ isDarkMode }) =>
    isDarkMode
      ? '1px solid rgba(255, 255, 255, 0.3)'
      : '1px solid rgba(0, 0, 0, 0.3)'};
  display: none;
  animation: ${fadeIn} 0.7s forwards;

  ${(props) =>
    props.isMenuHovered &&
    `
  display: block;
  opacity: 1;
  transform: translateY(0);
  visibility: visible;

`};
`;

const StoreSubMenuContainer = styled.div`
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

const CommunitySubMenuContainer = styled.div`
  z-index: 1;
  margin-top: 17px;
  box-sizing: border-box;
  padding: 20px 0px;
  border-bottom: ${({ isDarkMode }) =>
    isDarkMode
      ? '1px solid rgba(255, 255, 255, 0.3)'
      : '1px solid rgba(0, 0, 0, 0.3)'};
  border-top: ${({ isDarkMode }) =>
    isDarkMode
      ? '1px solid rgba(255, 255, 255, 0.3)'
      : '1px solid rgba(0, 0, 0, 0.3)'};
  display: none;
  animation: ${fadeIn} 0.7s forwards;

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
  width: 40%;
  display: flex;
  justify-content: space-evenly;
  text-decoration: none;
`;

const CategoryItem = styled.div`
  margin: 0 10px;
  width: auto;
`;

const SubMenu = styled.div`
  font-size: 15px;
  width: 120px;
`;

// 검색 CSS
// const SearchWrap = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   background-color: rgba(0, 0, 0, 0.5);
//   z-index: 1000;
// `;

// const SearchContainer = styled.div`
//   position: absolute;
//   top: 30%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   background-color: #fff;
//   border-radius: 12px;
//   display: flex;
//   width: 80%;
//   height: 25%;
// `;

// const SearchForm = styled.form`
//   position: relative;
//   display: flex;
//   flex-direction: row;
//   align-content: center;
//   align-items: center;
//   margin: auto;
// `;

// const SearchInput = styled.input`
//   border: 0;
//   outline: none;
//   border-bottom: black solid 1px;
//   font-size: 35px;
//   padding: 0px 30px;
//   text-align: center;
//   width: 100%;
//   background: transparent;
// `;

// const SearchButton = styled.div`
//   border: 0;
//   background: transparent;
// `;

// const SearchIcon = styled.img`
//   border: 0;
//   background: transparent;
// `;

// const CloseButton = styled.div`
//   all: unset;
//   cursor: pointer;
//   color: black;
//   position: relative;
//   font-size: 30px;
//   white-space: nowrap;
//   margin-left: 5%;
// `;

const SearchWrap = styled.div`
  width: 100%;
  height: 100vh;
  background-color: white;
  overflow: hidden;
  z-index: 1;
  position: absolute;
  top: 0;
`;

const SearchContainer = styled.div`
  align-items: stretch;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  position: relative;
  box-sizing: border-box;
  padding: 1.5rem 10%;
  box-sizing: border-box;
`;

const SearchInputBox = styled.div``;

const SearchInput = styled.input`
  border: none;
  padding: 10px;
  border-bottom: 2px solid black;
`;

const SearchButton = styled.div`
  cursor: pointer;
`;

const SearchIcon = styled.img``;

const CloseButton = styled.div``;

const ResultContainer = styled.div``;

const Result = styled.div``;
