import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import "../styles/AdminNav.css";

function AdminNav() {
  const location = useLocation();
  const [selectedMenu, setSelectedMenu] = useState("");

  const handleMenuClick = (menu) => {
    if (selectedMenu === menu) {
      setSelectedMenu("");
    } else {
      setSelectedMenu(menu);
    }
  };

  const isMenuOpen = (menu) => {
    return (
      selectedMenu === menu ||
      selectedMenu.includes(menu + "-sub") ||
      location.pathname.startsWith(`/admin/${menu}`)
    );
  };

  if (!location.pathname.startsWith("/admin")) {
    return null;
  }

  const renderSubMenu = (menu, label) => {
    const isActive = isMenuOpen(menu);
    return (
      <li key={menu}>
        <Link
          to={`/admin/${menu}`}
          className={`admin-nav-link ${isActive ? "active" : ""}`}
          onClick={() => handleMenuClick(menu)}
        >
          {label}
        </Link>
      </li>
    );
  };

  return (
    <nav className="admin-nav">
      <div className="link-to-main">
        <Link className="toMain" to="/" style={{ textDecoration: "none" }}>
          &lt; 메인페이지로 돌아가기
        </Link>
      </div>
      <h3>관리자페이지</h3>
      <ul className="admin-nav-list">
        {[
          { menu: "analysis", label: "분석" },
          { menu: "customerservice", label: "고객서비스" },
          { menu: "eventnews", label: "이벤트 및 뉴스" },
          { menu: "membermanagement", label: "회원 관리" },
          { menu: "storemanagement", label: "매장 관리" },
          { menu: "subscribemanagement", label: "구독 관리" },
        ].map(({ menu, label }) => {
          return renderSubMenu(menu, label);
        })}
      </ul>
    </nav>
  );
}

export default AdminNav;
