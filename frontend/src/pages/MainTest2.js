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
      name: "spring",
      text: "냥냥쓰",
      buttonText: "더 보기",
    },
    {
      name: "summer",
      text: "Summer Caption",
      buttonText: "Summer Button",
    },
    {
      name: "autumn",
      text: "Autumn Caption",
      buttonText: "Autumn Button",
    },
    {
      name: "winter",
      text: "Winter Caption",
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
          <CaptionBox name={captions[index].name}>
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
  width: 100%;
  height: auto;
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
    switch (props.name) {
      case "spring":
        return "top: 20px; left: 20px;";
      case "summer":
        return "top: 20%; right: 10%;";
      case "autumn":
        return "bottom: 20px; right: 20px;";
      case "winter":
        return "bottom: 20px; left: 20px;";
      default:
        return "top: 20px; left: 20px;";
    }
  }} */
  width: 100%;
  height: 40%;
  bottom: 30%;
  /* left: 50%; */
  /* transform: translateX(-50%); */
  font-size: 18px;
  font-weight: bold;
  color: black;
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
