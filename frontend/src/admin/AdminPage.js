import React, { useState } from "react";
import * as Components from "./components";
import "./Admin.css";

function AdminPage() {
  const [selectedTab, setSelectedTab] = useState("1");

  function getContent() {
    switch (selectedTab) {
      case "1":
        return (
          <div className="content">
            <Components.AdminAnalysis />
          </div>
        );
      case "2":
        return (
          <div className="content">
            <Components.AdminCustomerService />
          </div>
        );
      case "3":
        return (
          <div className="content">
            <Components.AdminEventNews />
          </div>
        );
      case "4":
        return (
          <div className="content">
            <Components.AdminMemberManagement />
          </div>
        );
      case "5":
        return (
          <div className="content">
            <Components.AdminStoreManagement />
          </div>
        );
      case "6":
        return (
          <div className="content">
            <Components.AdminSubscribeManagement />
          </div>
        );
      default:
        return <div>뭘 누른거야;</div>;
    }
  }

  return (
    <div className="admin-container">
      <div className="admin-row">
        <div className="admin-nav-wrapper">
          <div className="admin-nav-menu">
            <ul>
              <li
                className={`admin-menu-item ${
                  selectedTab === "1" ? "active" : ""
                }`}
                onClick={() => setSelectedTab("1")}
              >
                분석
              </li>
              <li
                className={`admin-menu-item ${
                  selectedTab === "2" ? "active" : ""
                }`}
                onClick={() => setSelectedTab("2")}
              >
                고객 서비스
              </li>
              <li
                className={`admin-menu-item ${
                  selectedTab === "3" ? "active" : ""
                }`}
                onClick={() => setSelectedTab("3")}
              >
                이벤트 및 뉴스
              </li>
              <li className="admin-menu-divider"></li>
              <li
                className={`admin-menu-item ${
                  selectedTab === "4" ? "active" : ""
                }`}
                onClick={() => setSelectedTab("4")}
              >
                회원 관리
              </li>
              <li
                className={`admin-menu-item ${
                  selectedTab === "5" ? "active" : ""
                }`}
                onClick={() => setSelectedTab("5")}
              >
                매장 관리
              </li>
              <li
                className={`admin-menu-item ${
                  selectedTab === "6" ? "active" : ""
                }`}
                onClick={() => setSelectedTab("6")}
              >
                구독 관리
              </li>
            </ul>
          </div>
        </div>
        <div className="admin-content-wrapper">{getContent()}</div>
      </div>
    </div>
  );
}

export default AdminPage;
