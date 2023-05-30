import React, { useEffect, useRef, useState } from "react";
import "../styles/MainPage.css";
import SPRING from "../assets/main/spring-image.jpg";
import SUMMER from "../assets/main/summer-image.jpg";
import AUTUMN from "../assets/main/autumn-image.jpg";
import WINTER from "../assets/main/winter-image.jpg";

import styled from "styled-components";
import Navigation from "./Navigation";
import Scroll from "./Scroll";

function MainTest() {
  const [scrollPosition, setScrollPosition] = useState(0);
  console.log(scrollPosition);

  const updateScroll = () => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  };

  useEffect(() => {
    window.addEventListener("scroll", updateScroll);
  }, []);

  return (
    <Wrap>
      {/* <ImageBox
        className={
          scrollPosition >= 0 && scrollPosition <= 500
            ? "scroll-text"
            : "scrolled-text"
        }
      >
        <Image src={SPRING} alt="이미지 1" />
      </ImageBox>
      <ImageBox
        className={scrollPosition > 500 ? "scroll-text" : "scrolled-text"}
      >
        <Image src={SUMMER} alt="이미지 2" />
      </ImageBox>
      <ImageBox
        className={scrollPosition > 1500 ? "scroll-text" : "scrolled-text"}
      >
        <Image src={AUTUMN} alt="이미지 3" />
      </ImageBox>
      <ImageBox
        className={scrollPosition > 2300 ? "scroll-text" : "scrolled-text"}
      >
        <Image src={WINTER} alt="이미지 4" />
      </ImageBox> */}
      <Navigation></Navigation>
      <Scroll></Scroll>
    </Wrap>
  );
}

export default MainTest;

const Wrap = styled.div`
  width: 100%;
`;

const ImageBox = styled.div`
  width: 100%;
  height: 1000px;
  opacity: 0;
  &.scroll-text {
    transition: 1.5s ease;
    opacity: 1;
  }
  &.scrolled-text {
    transition: 1.5s ease;
    opacity: 0;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 1000px;
`;
