import React, { useState } from "react";
import "../../../styles/StoreMain.css";
import ProductCard from "./ProductCard";
import styled from "styled-components";

const CardList = ({ products, currentPage, setCurrentPage }) => {
  // const productsPerPage = 12;

  // // 페이지 수 계산
  // const totalPages = Math.ceil(products.length / productsPerPage);

  // // 페이지별로 보여줄 상품 데이터 선택
  // const indexOfLastProduct = currentPage * productsPerPage;
  // const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  // const currentProducts = products.slice(
  //   indexOfFirstProduct,
  //   indexOfLastProduct
  // );

  // // 페이지 변경 함수
  // const handlePageChange = (pageNumber) => {
  //   setCurrentPage(Number(pageNumber));
  // };

  return (
    <div>
      <Cardbox>
        {products.map((product) => {
          return <ProductCard key={product.prodNum} product={product} />;
        })}
      </Cardbox>
      {/* <Pagination>
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
      <div>
        {products.length === 0 ? (
          <div style={{ margin: "100px auto" }}>
            <center style={{ fontSize: "20px", fontFamily: "Pretendard" }}>
              로딩중입니다.
            </center>
            <div style={{ height: "100px" }}></div>
          </div>
        ) : (
          " "
        )}
      </div> */}
    </div>
  );
};
//flex박스로 고치기?
const Cardbox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 90vw;
  height: fit-content;
  max-width: 1200px;
  margin: 0 auto;
  @media screen and (max-width: 984px) {
    justify-content: center;
  }
`;
const Pagination = styled.div`
  display: inline-block;
  width: 100%;
  height: 30px;
  margin: 10px auto;
  text-align: center;
  align-items: center;
`;
const PageBtn = styled.div`
  display: inline-block;
  cursor: pointer;
  margin: 5px;
  padding: 2px;
  font-family: "Pretendard";
  font-size: 0.85rem;
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
  font-size: 0.85rem;
  border: 1px solid;
  width: 1rem;
  &:hover {
    border-color: black;
  }
`;

export default CardList;
