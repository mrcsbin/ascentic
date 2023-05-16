import React, { useState, useEffect } from "react";
import "../../styles/Header.css";
import { Link, useLocation } from "react-router-dom";
import iconUser from "../../assets/iconUser.svg";
import iconBag from "../../assets/iconBag.svg";
import iconSearch from "../../assets/iconSearch.svg";
import { getCookie, setCookie, removeCookie } from "../../utils/Cookies";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!getCookie("accessToken"));
  const location = useLocation();

  function handleLogout() {
    removeCookie("accessToken");
    setIsLoggedIn(false);
    window.location.replace("/");
  }

  // "/admin" 산하의 페이지에는 Header 컴포넌트를 렌더링하지 않음
  if (location.pathname.startsWith("/admin")) return null;

  return (
    <div className="header-wrap">
      {/* flexbox 부모 컨테이너 */}
      <nav className="navbar">
        {/* flexbox 자식 컨테이너 #1 */}
        <div className="navbarLogo">
          <li>
            <Link to="/" style={{ textDecoration: "none", color: "black" }}>
              [a]scentic
            </Link>
          </li>
        </div>
        {/* flexbox 자식 컨테이너 #2 */}
        <ul className="navbarMenu">
          <li>
            <Link
              to="/storemain"
              style={{ textDecoration: "none", color: "black" }}
            >
              체험
            </Link>
          </li>
          <li>
            <Link
              to="/storemain"
              style={{ textDecoration: "none", color: "black" }}
            >
              스토어
            </Link>
          </li>
          <li>
            <Link
              to="/proddetail"
              style={{ textDecoration: "none", color: "black" }}
            >
              커뮤니티
            </Link>
          </li>
        </ul>
        {/* flexbox 자식 컨테이너 #3 */}
        <ul className="navbarIcon">
          <li>
            <img src={iconSearch} alt="iconSearch"></img>
          </li>
          <li>
            <Link to="/login" style={{ textDecoration: "none" }}>
              <img src={iconUser} alt="iconMyPage"></img>
            </Link>
          </li>
          <li>
            <Link to="/cart" style={{ textDecoration: "none" }}>
              <img src={iconBag} alt="iconBag"></img>
            </Link>
          </li>
          {isLoggedIn ? (
            <li>
              <Link to="/" style={{ textDecoration: "none" }}>
                <button onClick={handleLogout}>임시</button>
              </Link>
            </li>
          ) : null}
        </ul>
      </nav>
    </div>
  );
};

export default Header;
