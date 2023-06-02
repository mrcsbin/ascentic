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
    const isVisible = scrollTop > 100;
    setIsVisible(isVisible);
  };

  const scrollToTop = () => {
    // 버튼 클릭 이벤트 후 스크롤 이벤트를 잠시 무시
    window.removeEventListener("scroll", handleScroll);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    // 일정 시간 후 스크롤 이벤트 다시 활성화
    setTimeout(() => {
      window.addEventListener("scroll", handleScroll);
    }, 1000); // 1초 후에 스크롤 이벤트를 다시 활성화할 수 있도록 설정
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
  width: 70px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.img`
  width: 50px;
  height: 50px;
`;
