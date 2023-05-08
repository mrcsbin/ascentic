import React from "react";
import "../../styles/Header.css";
import { Link } from "react-router-dom";
import iconUser from "../../assets/iconUser.svg";
import iconBag from "../../assets/iconBag.svg";
import iconSearch from "../../assets/iconSearch.svg";

//HSM
//RouteTest.js 에 임시로 연결

const Header = () => {
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
            <Link to="/order" style={{ textDecoration: "none" }}>
              <img src={iconBag} alt="iconBag"></img>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
