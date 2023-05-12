import React, { useState } from "react";
import * as Components from "./components";
import "./Admin.css";

function AdminPage() {
  const [selectedTab, setSelectedTab] = useState("1");

  const tabComponentMap = {
    1: <Components.AdminAnalysis />,
    2: <Components.AdminCustomerService />,
    3: <Components.AdminEventNews />,
    4: <Components.AdminMemberManagement />,
    5: <Components.AdminStoreManagement />,
    6: <Components.AdminSubscribeManagement />,
  };

  const AdminNavMenu = () => (
    <div className="admin-nav-menu">
      <ul>
        <li
          className={`admin-menu-item ${selectedTab === "1" ? "active" : ""}`}
          onClick={() => setSelectedTab("1")}
        >
          분석
        </li>
        <li
          className={`admin-menu-item ${selectedTab === "2" ? "active" : ""}`}
          onClick={() => setSelectedTab("2")}
        >
          고객 서비스
        </li>
        <li
          className={`admin-menu-item ${selectedTab === "3" ? "active" : ""}`}
          onClick={() => setSelectedTab("3")}
        >
          이벤트 및 뉴스
        </li>
        <li className="admin-menu-divider"></li>
        <li
          className={`admin-menu-item ${selectedTab === "4" ? "active" : ""}`}
          onClick={() => setSelectedTab("4")}
        >
          회원 관리
        </li>
        <li
          className={`admin-menu-item ${selectedTab === "5" ? "active" : ""}`}
          onClick={() => setSelectedTab("5")}
        >
          매장 관리
        </li>
        <li
          className={`admin-menu-item ${selectedTab === "6" ? "active" : ""}`}
          onClick={() => setSelectedTab("6")}
        >
          구독 관리
        </li>
      </ul>
    </div>
  );

  const AdminContent = () => (
    <div className="admin-content">{tabComponentMap[selectedTab]}</div>
  );

  return (
    <div className="admin-container">
      <div className="admin-row">
        <div className="admin-nav-wrapper">
          <AdminNavMenu />
        </div>
        <div className="admin-content-wrapper">
          <AdminContent />
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
