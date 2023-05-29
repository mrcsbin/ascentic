import React, { useEffect, useRef } from "react";
import "../styles/MainPage.css";
import SPRING from "../assets/main/spring-image.jpg";
import SUMMER from "../assets/main/summer-image.jpg";
import AUTUMN from "../assets/main/autumn-image.jpg";
import WINTER from "../assets/main/winter-image.jpg";

import styled from "styled-components";

function MainTest() {
  const canvasRef = useRef(null);
  const frameCount = 148;
  const currentFrame = (index) =>
    `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/${index
      .toString()
      .padStart(4, "0")}.jpg`;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const html = document.documentElement;

    const preloadImages = () => {
      for (let i = 1; i < frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
      }
    };

    const updateImage = (index) => {
      const img = new Image();
      img.src = currentFrame(index);
      img.onload = function () {
        context.drawImage(img, 0, 0);
      };
    };

    const handleScroll = () => {
      const scrollTop = html.scrollTop;
      const maxScrollTop = html.scrollHeight - window.innerHeight;
      const scrollFraction = scrollTop / maxScrollTop;
      const frameIndex = Math.min(
        frameCount - 1,
        Math.ceil(scrollFraction * frameCount)
      );

      requestAnimationFrame(() => updateImage(frameIndex + 1));
    };

    window.addEventListener("scroll", handleScroll);

    preloadImages();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Wrap>
      <Canvas ref={canvasRef} id="hero-lightpass" />
    </Wrap>
  );
}

export default MainTest;

const Wrap = styled.div`
  height: 500vh;
  background: #000;
`;

const Canvas = styled.canvas`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  max-width: 100vw;
  max-height: 100vh;
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
