import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SPRING from "../assets/main/spring-image.jpg";
import SUMMER from "../assets/main/summer-image.jpg";
import AUTUMN from "../assets/main/autumn-image.jpg";
import WINTER from "../assets/main/winter-image.jpg";

function MainTest() {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [SPRING, SUMMER, AUTUMN, WINTER];
  const captions = [
    {
      text: "냥냥쓰",
      position: "top-left",
      buttonText: "더 보기",
    },
    {
      text: "Summer Caption",
      position: "bottom-right",
      buttonText: "Summer Button",
    },
    {
      text: "Autumn Caption",
      position: "top-right",
      buttonText: "Autumn Button",
    },
    {
      text: "Winter Caption",
      position: "bottom-left",
      buttonText: "Winter Button",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const maxScrollTop =
        document.documentElement.scrollHeight - window.innerHeight;
      const imageHeight = maxScrollTop / images.length;
      const imageIndex =
        scrollTop >= maxScrollTop
          ? images.length - 1
          : Math.floor(scrollTop / imageHeight);
      setCurrentImage(imageIndex);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Wrap>
      {images.map((image, index) => (
        <ImageContainer key={index} isActive={currentImage === index}>
          <Image src={image} alt="이미지" />
          <CaptionBox position={captions[index].position}>
            <Caption>{captions[index].text}</Caption>
            <Button>{captions[index].buttonText}</Button>
          </CaptionBox>
        </ImageContainer>
      ))}
    </Wrap>
  );
}

export default MainTest;

const Wrap = styled.div`
  height: 3000px;
  width: 100%;
`;

const ImageContainer = styled.div`
  margin-top: 108px;
  position: fixed;
  /* top: 0; */
  width: 100%;
  height: auto;
  /* display: ${(props) => (props.isActive ? "block" : "none")}; */
  opacity: ${(props) => (props.isActive ? 1 : 0)};
  transition: opacity 0.5s ease;
`;

const Image = styled.img`
  width: 100%;
  height: 100vh;
  object-fit: cover;
`;

const CaptionBox = styled.p`
  position: absolute;
  /* ${(props) => {
    switch (props.position) {
      case "top-left":
        return "top: 20px; left: 20px;";
      case "top-right":
        return "top: 20px; right: 20px;";
      case "bottom-right":
        return "bottom: 20px; right: 20px;";
      case "bottom-left":
        return "bottom: 20px; left: 20px;";
      default:
        return "top: 20px; left: 20px;";
    }
  }} */
  bottom: 30%;
  left: 50%;
  transform: translateX(-50%);
  font-size: 18px;
  font-weight: bold;
  color: white;
  text-align: center;
  white-space: pre-line;
`;

const Caption = styled.div``;

const Button = styled.button`
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #000;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
