import React from "react";
import { Button } from "react-bootstrap";
import styled from "styled-components";

const ProdList = (products) => {
  return (
    <ListWrapper>
      <ListTitle>제품 목록</ListTitle>
      <ListBox>
        <ContentTitle>
          <NumTitle>No</NumTitle>
          <ImgTitle>이미지</ImgTitle>
          <NameTitle>상품명</NameTitle>
          <PriceTitle>판매가</PriceTitle>
          <CatTitle>카테고리</CatTitle>
          <StockTitle>재고</StockTitle>
          <OptionTitle>옵션</OptionTitle>
          <DateTitle>등록일</DateTitle>
        </ContentTitle>
      </ListBox>
      {products.products.map((item, index) => (
        <Content>
          <ProdNum>{item.prodNum}</ProdNum>
          <ProdImage>
            <img
              src={`http://localhost:8080/images/${item.prodImage}`}
              alt="상품 이미지"
            ></img>
          </ProdImage>
          <ProdName>{item.prodName}</ProdName>
          <ProdPrice>{item.prodPrice.toLocaleString()}원</ProdPrice>
          <ProdCategory>{item.prodCategory}</ProdCategory>
          <ProdStock>{item.prodStock}개</ProdStock>
          <ProdOption>
            {item.options.map((option, index) => (
              <div key={index}>
                {option}
                {index !== item.options.length - 1 && "/"}{" "}
              </div>
            ))}
          </ProdOption>
          <ProdDate>{item.prodDate}</ProdDate>
          <EditBtn>
            <Button>수정</Button>
          </EditBtn>
        </Content>
      ))}
    </ListWrapper>
  );
};

const ListWrapper = styled.div`
  border-bottom: 2px solid black;
`;
const ListTitle = styled.div`
  font-size: 30px;
  font-weight: 700;
`;
const ListBox = styled.div`
  margin-top: 30px;
  border-top: 2px solid black;
  border-bottom: 2px solid black;
  background-color: white;
`;
const ContentTitle = styled.div`
  height: 40px;
  font-size: 23px;
  display: flex;
`;
const NumTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 5%;
`;
const ImgTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 10%;
`;
const NameTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 25%;
`;
const PriceTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 10%;
`;
const CatTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 10%;
`;
const OptionTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 15%;
`;

const StockTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 10%;
`;
const DateTitle = styled.div`
  width: 12%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  font-size: 16px;
  display: flex;
  height: 100px;
  border-bottom: 1px solid black;
`;

const ProdNum = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 5%;
`;

const ProdImage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 10%;
  > img {
    width: 70px;
    height: 70px;
  }
`;

const ProdName = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 25%;
`;

const ProdPrice = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 10%;
`;

const ProdCategory = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 10%;
`;

const ProdStock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 10%;
`;

const ProdOption = styled.div`
  display: flex;
  /* flex-direction: column; */
  align-items: center;
  justify-content: center;
  width: 15%;
`;

const ProdDate = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 10%;
`;

const EditBtn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 5%;

  > button {
    width: 50px;
    height: 30px;
    background-color: black;
    color: white;
  }
`;

export default ProdList;
