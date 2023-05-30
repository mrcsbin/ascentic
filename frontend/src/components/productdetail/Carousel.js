import React, { useState } from "react";
import styled from "styled-components";
import TEST_IMAGE from "../../assets/correct.png";
import RIGHT_ARROW from "../../assets/productdetail/right-arrow.png";
import LEFT_ARROW from "../../assets/productdetail/left-arrow.png";

const items = [
  { id: 1, name: "Item 1" },
  { id: 2, name: "Item 2" },
  { id: 3, name: "Item 3" },
  { id: 4, name: "Item 4" },
  { id: 5, name: "Item 5" },
  { id: 6, name: "Item 6" },
  { id: 7, name: "Item 7" },
];

const Carousel = () => {
  const [translateXValue, setTranslateXValue] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const slideNext = () => {
    const carouselContainer = document.querySelector(".carousel-container");
    const containerWidth = carouselContainer.offsetWidth;
    const visibleItems = 3;

    const itemCardWidth = containerWidth / visibleItems;
    const totalItems = items.length;
    const totalPages = Math.ceil(totalItems / visibleItems);
    const maxTranslateX = -(itemCardWidth * (totalPages - 1));

    if (currentPage < totalPages) {
      setTranslateXValue(
        (prevTranslateXValue) =>
          prevTranslateXValue - itemCardWidth * visibleItems
      );
      setCurrentPage((prevPage) => prevPage + 1);
    } else {
      setTranslateXValue(0);
      setCurrentPage(1);
    }
  };

  const slidePrev = () => {
    const carouselContainer = document.querySelector(".carousel-container");
    const containerWidth = carouselContainer.offsetWidth;
    const visibleItems = 3;

    const itemCardWidth = containerWidth / visibleItems;
    const totalItems = items.length;
    const totalPages = Math.ceil(totalItems / visibleItems);
    const maxTranslateX = -(itemCardWidth * (totalPages - 1));

    if (currentPage > 1) {
      setTranslateXValue(
        (prevTranslateXValue) =>
          prevTranslateXValue + itemCardWidth * visibleItems
      );
      setCurrentPage((prevPage) => prevPage - 1);
    } else {
      setTranslateXValue(maxTranslateX);
      setCurrentPage(totalPages);
    }
  };

  return (
    <>
      <Wrapper>
        <ButtonBox>
          <PrevButton
            show={currentPage !== 1}
            onClick={slidePrev}
            src={LEFT_ARROW}
          />
        </ButtonBox>
        <CarouselWrapper>
          <CarouselContainer
            className="carousel-container"
            style={{ transform: `translateX(${translateXValue}px)` }}
          >
            {items.map((item) => (
              <CarouselItem key={item.id}>
                <CarouselImage src={TEST_IMAGE} alt="상품 이미지" />
                <CarouselName>{item.name}</CarouselName>
                <CarouselPrice>30,000원</CarouselPrice>
              </CarouselItem>
            ))}
          </CarouselContainer>
        </CarouselWrapper>
        <ButtonBox>
          <NextButton
            show={currentPage !== Math.ceil(items.length / 3)}
            onClick={slideNext}
            src={RIGHT_ARROW}
          />
        </ButtonBox>
      </Wrapper>
      <PageIndicator>{`${currentPage}/${Math.ceil(
        items.length / 3
      )}`}</PageIndicator>
    </>
  );
};

export default Carousel;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
`;

const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CarouselWrapper = styled.div`
  width: 100%;
  overflow: hidden;
`;

const CarouselContainer = styled.div`
  display: flex;
  transition: transform 0.3s ease;
`;

const CarouselItem = styled.div`
  flex: 0 0 calc(33.3333%);
  height: 500px;
  padding: 5%;
  box-sizing: border-box;
`;

const NextButton = styled.img`
  width: 20px;
  cursor: pointer;
  display: ${(props) => (props.show ? "block" : "none")};
`;

const PrevButton = styled.img`
  width: 20px;
  cursor: pointer;
  display: ${(props) => (props.show ? "block" : "none")};
`;

const CarouselImage = styled.img`
  width: 100%;
`;

const CarouselName = styled.div`
  text-align: center;
  margin: 20px 0;
  font-size: 1.5rem;
`;

const CarouselPrice = styled.div`
  text-align: center;
  margin: 20px 0;
  font-size: 1.5rem;
`;

const PageIndicator = styled.div`
  text-align: center;
`;
