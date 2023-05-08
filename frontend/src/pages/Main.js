import React from "react";
import "../styles/MainPage.css";
import mainImage from "../assets/mainwide.jpg";
function MainPage() {
  return (
    <div className="main_page_real">
      <div className="main_page">
        <img className="backgroundImage" src={mainImage} alt="main_image" />
      </div>
    </div>
  );
}

export default MainPage;
