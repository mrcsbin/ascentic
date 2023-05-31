import React, { useEffect, useRef } from "react";
import "../styles/MainPage.css";
import SPRING from "../assets/main/spring.mp4";
import SUMMER from "../assets/main/summer.mp4";
import styled from "styled-components";

function MainTest() {
  const targetRef = useRef(null);
  const videoRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const videoElement = videoRef.current;
      const targetElement = targetRef.current;

      if (!targetElement || !videoElement) {
        return; // targetRef나 videoRef가 null인 경우 빠른 종료
      }

      const videoTop = videoElement.getBoundingClientRect().top;
      const videoBottom = videoElement.getBoundingClientRect().bottom;
      const targetTop = targetElement.getBoundingClientRect().top;
      const targetBottom = targetElement.getBoundingClientRect().bottom;

      if (videoTop <= targetBottom && videoBottom >= targetTop) {
        if (videoElement.paused) {
          videoElement.play();
        }
      } else {
        if (!videoElement.paused) {
          videoElement.pause();
        }
      }
    };

    observerRef.current = new IntersectionObserver(handleScroll, {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    });

    const targetElement = targetRef.current;

    if (targetElement) {
      observerRef.current.observe(targetElement);
    }

    return () => {
      if (targetElement) {
        observerRef.current.unobserve(targetElement);
      }
    };
  }, []);

  return (
    <Wrap ref={targetRef}>
      <Content>
        <StyledVideo autoPlay muted loop>
          <source src={SPRING} type="video/mp4" />
        </StyledVideo>
      </Content>
      <Content>
        <StyledVideo autoPlay muted loop>
          <source src={SUMMER} type="video/mp4" />
        </StyledVideo>
      </Content>
    </Wrap>
  );
}

export default MainTest;

const Wrap = styled.div`
  width: 100%;
`;

const Content = styled.div`
  width: 100%;
  height: 800px;
  padding-top: 108px;
`;

const StyledVideo = styled.video`
  width: 100%;
  height: 800px;
`;
