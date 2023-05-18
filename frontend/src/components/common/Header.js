// import React, { useState, useEffect } from "react";
// import "../../styles/Header.css";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import iconUser from "../../assets/iconUser.svg";
// import iconBag from "../../assets/iconBag.svg";
// import iconSearch from "../../assets/iconSearch.svg";
// import { getCookie, removeCookie } from "../../utils/Cookies";
// import { useSelector, useDispatch } from "react-redux";
// import { setIsLogin } from "../../store/modules/login";
// import arrow from "../../assets/menu_arrow.svg";

// //HSM
// //RouteTest.js 에 임시로 연결

// const Header = () => {
//   if (location.pathname.startsWith("/admin")) {
//     return null;
//   }
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const isLoggedIn = useSelector((state) => state.login.isLogin);
//   const location = useLocation();

//   // 검색창
//   const [showSearch, setShowSearch] = useState(false);
//   // 소메뉴 펼치기
//   const [showMenu1, setShowMenu1] = useState(false);
//   // 검색창 켜기
//   const handleshowSearch = () => {
//     setShowSearch(true);
//   };
//   // 검색창 끄기
//   const handlehideSearch = () => {
//     setShowSearch(false);
//   };

//   function handleLogout() {
//     removeCookie("accessToken");
//     dispatch(setIsLogin(false));
//     navigate("/", { replace: true });
//   }

//   useEffect(() => {
//     const checkLoginStatus = async () => {
//       const token = getCookie("accessToken");
//       if (token) {
//         await dispatch(setIsLogin(true));
//       }
//     };
//     checkLoginStatus();
//   }, [dispatch]);

//   return (
//     <div className="header-wrap">
//       {/* flexbox 부모 컨테이너 */}
//       <nav className="navbar">
//         {/* flexbox 자식 컨테이너 #1 */}
//         <div className="navbarLogo">
//           <li>
//             <Link to="/" style={{ textDecoration: "none", color: "black" }}>
//               [a]scentic
//             </Link>
//           </li>
//         </div>
//         {/* flexbox 자식 컨테이너 #2 */}
//         <ul className="navbarMenu">
//           <li className="menu2-1">
//             <div className="menu2-1-box">
//               <Link
//                 to="/storemain"
//                 style={{
//                   textDecoration: "none",
//                   color: "black",
//                 }}
//               >
//                 체험
//               </Link>
//             </div>
//             {/* <img src={arrow} alt="arrow"></img> */}
//             <div className="submenu sub2-1">
//               <div className="sub-content">
//                 <ul>
//                   <li>
//                     <Link to="/">구독 소개</Link>
//                   </li>
//                   <li>
//                     <Link to="/">취향 테스트</Link>
//                   </li>
//                   <li>
//                     <Link to="/">구독 신청</Link>
//                   </li>
//                   <li>
//                     <Link to="/">구독 관리</Link>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </li>
//           <li className="menu2-2">
//             <div className="menu2-2-box">
//               <Link
//                 to="/storemain"
//                 style={{ textDecoration: "none", color: "black" }}
//               >
//                 스토어
//               </Link>
//             </div>
//             <div className="submenu sub2-2">
//               <div className="sub-content">
//                 <ul>
//                   <li>
//                     <Link to="/">필터</Link>
//                   </li>
//                   <li>
//                     <Link to="/">검색 결과</Link>
//                   </li>
//                   <li>
//                     <Link to="/">제품별 카테고리</Link>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </li>
//           <li className="menu2-3">
//             <div className="menu2-3-box">
//               <Link
//                 to="/proddetail"
//                 style={{ textDecoration: "none", color: "black" }}
//               >
//                 커뮤니티
//               </Link>
//             </div>
//             <div className="submenu sub2-3">
//               <div className="sub-content">
//                 <ul>
//                   <li>
//                     <Link to="/">뉴스</Link>
//                   </li>
//                   <li>
//                     <Link to="/">공지사항</Link>
//                   </li>
//                   <li>
//                     <Link to="/">이벤트</Link>
//                   </li>
//                   <li>
//                     <Link to="/">커뮤니티 글</Link>
//                   </li>
//                   <li>
//                     <Link to="/">리뷰</Link>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </li>
//         </ul>
//         {/* flexbox 자식 컨테이너 #3 */}
//         <ul className="navbarIcon">
//           <li>
//             <img
//               src={iconSearch}
//               alt="iconSearch"
//               onClick={handleshowSearch}
//               style={{ cursor: "pointer" }}
//             ></img>
//           </li>
//           <li>
//             <Link to="/login" style={{ textDecoration: "none" }}>
//               <img src={iconUser} alt="iconMyPage"></img>
//             </Link>
//           </li>
//           <li>
//             <Link to="/cart" style={{ textDecoration: "none" }}>
//               <img src={iconBag} alt="iconBag"></img>
//             </Link>
//           </li>
//           {isLoggedIn ? (
//             <li>
//               <Link to="/" style={{ textDecoration: "none" }}>
//                 <button onClick={handleLogout}>임시</button>
//               </Link>
//             </li>
//           ) : null}
//         </ul>
//       </nav>
//       {/* 검색창 */}
//       {showSearch && (
//         <div className="search">
//           <div className="search-wrap">
//             {/* 0512 form 삭제하기 -> css 재작업 */}
//             <form>
//               <input
//                 type="text"
//                 name="search"
//                 placeholder="원하는 향을 검색하세요."
//                 minLength="1"
//                 maxLength="10"
//               ></input>
//               <button type="submit" class="search-img">
//                 <img
//                   src={iconSearch}
//                   alt="iconSearch"
//                   style={{ cursor: "pointer" }}
//                 ></img>
//               </button>
//               <button className="close-btn" onClick={handlehideSearch}>
//                 닫기
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Header;
// // 구현 후 display none hover시 살아남 , z인덱스 x인덱스 이용해서 기본값을 보이는거에서 -> hover시 나오게 ,시간차 설정
