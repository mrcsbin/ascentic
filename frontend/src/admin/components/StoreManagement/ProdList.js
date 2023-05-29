import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Items from "./Items";
import axios from "axios";
import ProdEditModal from "./ProdEditModal";

const ProdList = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("all");
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [selectProdNum, setSelectProdNum] = useState(0);

  const hadleOpenEditModal = (prodNum) => {
    setIsOpenEditModal(true);
    setSelectProdNum(prodNum);
  };

  const hadleCloseEditModal = () => {
    setIsOpenEditModal(false);
  };

  const categories = [
    {
      name: "all",
      text: "all",
    },
    {
      name: "향수",
      text: "향수",
    },
    {
      name: "디퓨저",
      text: "디퓨저",
    },
    {
      name: "향초",
      text: "향초",
    },
    {
      name: "핸드크림",
      text: "핸드크림",
    },
    {
      name: "샴푸",
      text: "샴푸",
    },
    {
      name: "바디워시",
      text: "바디워시",
    },
    {
      name: "섬유향수",
      text: "섬유향수",
    },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/admingetprodlist?category=${category}`
        );
        setProducts(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchProducts();
  }, [category]);

  return (
    <>
      <CategoriesBox>
        {categories.map((c) => (
          <button
            key={c.text}
            className={c.text === category ? "activeCateBtn" : "cateBtn"}
            onClick={() => setCategory(c.name)}
          >
            {c.name}
          </button>
        ))}
      </CategoriesBox>
      <TitleContainer>
        <ListTitle>제품 목록</ListTitle>
      </TitleContainer>
      <ListWrapper>
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
        {isOpenEditModal && (
          <ProdEditModal
            prodNum={selectProdNum}
            hadleCloseEditModal={hadleCloseEditModal}
          />
        )}
      </ListWrapper>
    </>
  );
};

const CategoriesBox = styled.div`
  padding: 10px auto;
  width: 100%;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid black;
  button {
    margin: 10px;
    padding: 10px;
    font-size: 1rem;
    background-color: white;
    border: 0;
    cursor: pointer;
  }
  .activeCateBtn,
  .cateBtn:hover {
    font-weight: 700;
  }
`;

const ListWrapper = styled.div`
  margin: 0 auto;
  width: 90%;
  border-bottom: 2px solid black;
`;

const TitleContainer = styled.div`
  margin: 2% 5%;
  font-weight: 700;
  display: flex;
`;

const ListTitle = styled.div`
  width: 90%;
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
