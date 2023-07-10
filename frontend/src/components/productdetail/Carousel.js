import React, { useEffect, useState } from "react";
import styled from "styled-components";
import RIGHT_ARROW from "../../assets/productdetail/right-arrow.png";
import LEFT_ARROW from "../../assets/productdetail/left-arrow.png";
import axios from "axios";
import Loading from "../common/Loading";
import { Link } from "react-router-dom";
import { getRecommendList } from "../../api/ProductApi";

const Carousel = ({ prodNum, category, scentNoteName, navigate }) => {
  const [loading, setLoading] = useState(true);
  const [recommendProduct, setRecommendProduct] = useState();
  const [translateXValue, setTranslateXValue] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const slideNext = () => {
    const carouselContainer = document.querySelector(".carousel-container");
    const containerWidth = carouselContainer.offsetWidth;
    const visibleItems = 4;

    const itemCardWidth = containerWidth / visibleItems;
    const totalItems = recommendProduct.length;
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
    const totalItems = recommendProduct.length;
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

  useEffect(() => {
    const fetchRecommendList = async () => {
      // try {
      //   const res = await axios.get(
      //     `http://localhost:8080/product/recommend/${prodNum}?category=${category}`
      //   );
      //   console.log(res.data);
      //   setRecommendProduct(res.data);
      // } finally {
      // setLoading(false);
      // }
      const response = await getRecommendList(prodNum, scentNoteName);
      setRecommendProduct(response);
      setLoading(false);
    };
    fetchRecommendList();
  }, []);

  function addComma(num) {
    var regexp = /\B(?=(\d{3})+(?!\d))/g;
    return num.toString().replace(regexp, ",");
  }

  if (loading) {
    return <Loading />;
  }

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
            {recommendProduct.map((item, index) => (
              <CarouselItem key={index}>
                <Link
                  style={{ color: "black", textDecoration: "none" }}
                  onClick={() => {
                    navigate(`/store/productdetail/${item.productNum}`);
                    window.location.reload();
                  }}
                >
                  <CarouselImage
                    src={`http://localhost:8080/images/${item.productImage}`}
                    alt="상품 이미지"
                  />
                  <CarouselName>{item.productName}</CarouselName>
                  <CarouselPrice>{addComma(item.productPrice)}원</CarouselPrice>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContainer>
        </CarouselWrapper>
        <ButtonBox>
          <NextButton
            show={currentPage !== Math.ceil(recommendProduct.length / 4)}
            onClick={slideNext}
            src={RIGHT_ARROW}
          />
        </ButtonBox>
      </Wrapper>
      {/* <PageIndicator>{`${currentPage}/${Math.ceil(
        recommendProduct.length / 4
      )}`}</PageIndicator> */}
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
  flex: 0 0 calc(25%);
  height: 400px;
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
  transition: border-bottom 0.3s ease-in-out;
  :hover {
    border-bottom: 5px solid black;
  }
`;

const CarouselName = styled.div`
  text-align: center;
  margin: 20px 0;
  font-size: 1.1rem;
`;

const CarouselPrice = styled.div`
  text-align: center;
  margin: 20px 0;
  font-size: 1.1rem;
`;

const PageIndicator = styled.div`
  text-align: center;
`;
