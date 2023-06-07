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
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("old");

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

  const handleSort = () => {
    if (sortOption === "early") {
      products.sort((a, b) => {
        return new Date(b.prodNum) - new Date(a.prodNum);
      });
    } else if (sortOption === "old") {
      products.sort((a, b) => {
        return new Date(a.prodNum) - new Date(b.prodNum);
      });
    }
  };
  handleSort();

  const productsPerPage = 10;

  // 페이지 수 계산
  const totalPages = Math.ceil(products.length / productsPerPage);

  // 페이지별로 보여줄 상품 데이터 선택
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // 페이지 변경 함수
  const handlePageChange = (pageNumber) => {
    setCurrentPage(Number(pageNumber));
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/admingetprodlist?category=${category}`
        );
        console.log(res.data);
        setProducts(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchProducts();
    setCurrentPage(1);
  }, [category, sortOption]);

  return (
    <>
      <HeaderWrap>
        <HeaderLeft>상품 목록</HeaderLeft>
      </HeaderWrap>
      <InputContainer>
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
        <SortOptionBox>
          <button
            className={sortOption === "old" ? "active" : ""}
            onClick={() => setSortOption("old")}
          >
            번호순
          </button>
          <button
            className={sortOption === "early" ? "active" : ""}
            onClick={() => setSortOption("early")}
          >
            최신순
          </button>
        </SortOptionBox>
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
              <StateTitle>상태</StateTitle>
              <DateTitle>등록일</DateTitle>
              <EditTitle>수정</EditTitle>
            </ContentTitle>
          </ListBox>
          {handleSort()}
          {currentProducts.map((item, index) => (
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
        <Pagination>
          {currentPage - 3 <= 0 ? (
            ""
          ) : (
            <PageBtn onClick={() => handlePageChange(currentPage - 1)}>
              이전
            </PageBtn>
          )}
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(
              (pageNumber) =>
                pageNumber > currentPage - 3 && pageNumber < currentPage + 3
            )
            .map((pageNumber) => (
              <PageNumBtn
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                style={{
                  pointerEvents: pageNumber === currentPage ? "none" : "auto",
                  borderColor: pageNumber === currentPage ? "black" : "white",
                }}
              >
                {pageNumber}
              </PageNumBtn>
            ))}
          {currentPage + 3 > totalPages ? (
            ""
          ) : (
            <PageBtn onClick={() => handlePageChange(currentPage + 1)}>
              다음
            </PageBtn>
          )}
        </Pagination>
      </InputContainer>
    </>
  );
};

const CategoriesBox = styled.div`
  padding: 0 auto;
  margin-top: 10px;
  width: 100%;
  display: flex;
  justify-content: center;
  button {
    margin: 10px;
    padding: 10px;
    font-size: 1.3rem;
    background-color: white;
    border: 0;
    cursor: pointer;
  }
  .activeCateBtn,
  .cateBtn:hover {
    font-weight: 600;
    border-bottom: 2px solid black;
  }
`;
const HeaderWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin: 0 auto;
  padding-top: 30px;
  border-bottom: 2px solid black;
`;

const HeaderLeft = styled.div`
  padding: 20px 0;
  font-size: 30px;
  font-weight: 600;
`;
const SortOptionBox = styled.div`
  width: 95%;
  display: flex;
  justify-content: flex-end;
  padding: 0;
  button {
    background-color: white;
    border: 0;
    font-size: 1rem;
    font-weight: 400;
    margin: 0 5px 20px 5px;
    cursor: pointer;
  }
  .active {
    font-weight: 600;
    cursor: default;
  }
`;

const InputContainer = styled.div`
  width: 90%;
  height: 90%;
  margin: 0 auto;
`;

const ListWrapper = styled.div`
  margin: 0 auto;
  width: 90%;
  border-bottom: 2px solid black;
`;
const ListBox = styled.div`
  margin-top: 0;
  border-top: 1px solid gray;
  border-bottom: 1px solid gray;
  background-color: rgba(250, 250, 250, 1);
`;
const ContentTitle = styled.div`
  height: 40px;
  font-size: 1rem;
  display: flex;
  div {
    margin: 0 10px;
    font-weight: 600;
    color: rgba(100, 100, 100, 1);
  }
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
  width: 12%;
`;

const StockTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 10%;
`;

const StateTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 5%;
`;
const DateTitle = styled.div`
  width: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const EditTitle = styled.div`
  width: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Pagination = styled.div`
  display: inline-block;
  width: 100%;
  height: 30px;
  margin: 30px auto;
  text-align: center;
  align-items: center;
`;
const PageBtn = styled.div`
  display: inline-block;
  cursor: pointer;
  margin: 5px;
  padding: 2px;
  font-family: "Pretendard";
  font-size: 1rem;
  border: 1px solid;
  width: 2rem;
  &:hover {
    border-color: black;
  }
`;
const PageNumBtn = styled.div`
  display: inline-block;
  cursor: pointer;
  margin: 5px;
  padding: 2px;
  font-family: "Pretendard";
  font-size: 1rem;
  border: 1px solid;
  width: 1rem;
  &:hover {
    border-color: black;
  }
`;

export default ProdList;
