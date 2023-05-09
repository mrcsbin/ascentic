import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../../styles/StoreMain.css";
import ProductCard from "./ProductCard";

const CardList = ({ products }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

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
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div className="Cardbox">
        <div className="cont">
          {currentProducts.map((product) => {
            return <ProductCard key={product.prodNum} product={product} />;
          })}
        </div>
      </div>
      <div className="pagination">
        {currentPage - 3 <= 0 ? (
          ""
        ) : (
          <div
            className="btn"
            onClick={() => handlePageChange(currentPage - 3)}
          >
            이전
          </div>
        )}
        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter(
            (pageNumber) =>
              pageNumber > currentPage - 3 && pageNumber < currentPage + 3
          )
          .map((pageNumber) => (
            <div
              className="numbtn"
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              style={{
                pointerEvents: pageNumber == currentPage ? "none" : "auto",
                borderColor: pageNumber == currentPage ? "black" : "white",
              }}
            >
              {pageNumber}
            </div>
          ))}
        {currentPage + 3 > totalPages ? (
          ""
        ) : (
          <div
            className="btn"
            onClick={() => handlePageChange(currentPage + 3)}
          >
            다음
          </div>
        )}
      </div>
      <div>
        {products.length === 0 ? (
          <div style={{ margin: "100px auto" }}>
            <center style={{ fontSize: "20px", fontFamily: "Pretendard" }}>
              판매 중인 상품이 없습니다.
            </center>
            <div style={{ height: "100px" }}></div>
          </div>
        ) : (
          " "
        )}
      </div>
    </div>
  );
};

export default CardList;
