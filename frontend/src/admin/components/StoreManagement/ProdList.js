import React from "react";
import styled from "styled-components";
import Items from "./Items";

const ProdList = ({ products, hadleOpenEditModal, hadleOpenAddModal }) => {
  return (
    <ListWrapper>
      <TitleContainer>
        <ListTitle>제품 목록</ListTitle>
        <AddBtn onClick={() => hadleOpenAddModal()}>상품 추가</AddBtn>
      </TitleContainer>
      <ListBox>
        <ContentTitle>
          <NumTitle>No</NumTitle>
          <ImgTitle>이미지</ImgTitle>
          <NameTitle>상품명</NameTitle>
          <ScentTitle>향이름</ScentTitle>
          <PriceTitle>판매가</PriceTitle>
          <CatTitle>카테고리</CatTitle>
          <StockTitle>재고</StockTitle>
          <OptionTitle>옵션</OptionTitle>
          <DateTitle>등록일</DateTitle>
        </ContentTitle>
      </ListBox>
      {products.map((item, index) => (
        <Items
          item={item}
          index={index}
          hadleOpenEditModal={hadleOpenEditModal}
        />
      ))}
    </ListWrapper>
  );
};

const ListWrapper = styled.div`
  border-bottom: 2px solid black;
`;

const TitleContainer = styled.div`
  font-weight: 700;
  display: flex;
`;

const ListTitle = styled.div`
  width: 90%;
  font-size: 30px;
  font-weight: 700;
`;

const AddBtn = styled.button`
  background-color: white;
  cursor: pointer;
  width: 10%;
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
  width: 3%;
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
  width: 12%;
`;

const ScentTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 13%;
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
  width: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default ProdList;
