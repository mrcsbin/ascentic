import React, { useState, useEffect } from "react";
import styled from "styled-components";
import UP_IMAGE from "../../assets/productdetail/up-arrow.png";

const TopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const isVisible = scrollTop > 150;
    setIsVisible(isVisible);
  };

  const scrollToTop = () => {
    window.removeEventListener("scroll", handleScroll);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });


  };

  return (
    <TopButtonWrapper>
      {isVisible && (
        <ButtonBox className="top-button" onClick={scrollToTop}>
          <Button src={UP_IMAGE} />
        </ButtonBox>
      )}
    </TopButtonWrapper>
  );
};

export default TopButton;

const TopButtonWrapper = styled.div`
  position: fixed;
  bottom: 100px;
  right: 50px;
  z-index: 999;
`;

const ButtonBox = styled.div`
  cursor: pointer;
  border: 1px solid grey;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.img`
  width: 35px;
  height: 35px;
`;
