import React from "react";
import "../styles/MainPage.css";
import mainImage from "../assets/mainwide.jpg";
function MainPage() {
  return (
    <div>
      <img className="backgroundImage" src={mainImage} />
    </div>
  );
}

export default MainPage;
