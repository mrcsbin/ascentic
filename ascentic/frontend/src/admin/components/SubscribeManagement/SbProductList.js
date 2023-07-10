import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import SbProductUpdateBox from "./SbProductUpdateForm";

const SbProductList = ({
  sbProducts,
  setSbProducts,
  currentPage,
  setCurrentPage,
  updateMode,
  setUpdateMode,
  Categories,
}) => {
  const productsPerPage = 10;

  // 페이지 수 계산
  const totalPages = Math.ceil(sbProducts.length / productsPerPage);

  // 페이지별로 보여줄 상품 데이터 선택
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sbProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // 페이지 변경 함수
  const handlePageChange = (pageNumber) => {
    setCurrentPage(Number(pageNumber));
  };

  //cascade 설정안해서 subsSend 데이터가 없는 경우만 삭제 가능
  const deleteSbProduct = (p) => {
    if (window.confirm(`${p.scentName.scentName}을(를) 삭제하시겠습니까?`)) {
      axios
        .post(`http://localhost:8080/subsProduct/delete/${p.sbProdNum}`)
        .then(() => {
          alert("삭제되었습니다.");
          //   window.location.replace("/admin/subscribemanagement");
          setSbProducts(
            sbProducts.filter((prod) => prod.sbProdNum !== p.sbProdNum)
          );
        })
        .catch((e) => {
          console.error(e);
        });
    } else {
      alert("취소했습니다.");
    }
  };

  const SbProductBox = ({ sbproduct }) => {
    function addComma(num) {
      var regexp = /\B(?=(\d{3})+(?!\d))/g;
      return num.toString().replace(regexp, ",");
    }
    return (
      <SbProdBox>
        <InlineContent>
          <div>ID: {sbproduct.sbProdNum}</div>
          <div>{sbproduct.scentName.scentNoteName} Note</div>
        </InlineContent>
        <ImgBox>
          <img src={`/images/${sbproduct.sbProdImage}`} alt="sbProdImage" />
        </ImgBox>
        <BlockContent>{sbproduct.scentName.scentName} 향</BlockContent>
        <BlockContentS>{sbproduct.sbProdIntro}</BlockContentS>
        <InlineContent>
          <div>{addComma(sbproduct.sbProdPrice)}원</div>
          <div>재고: {sbproduct.sbProdStock}개</div>
        </InlineContent>
        <Buttonbox>
          <button onClick={() => setUpdateMode(Number(sbproduct.sbProdNum))}>
            수정
          </button>
          <button onClick={() => deleteSbProduct(sbproduct)}>삭제</button>
        </Buttonbox>
      </SbProdBox>
    );
  };

  return (
    <SbProductWrpper>
      {currentProducts.map((p) =>
        p.sbProdNum === updateMode ? (
          <SbProductUpdateBox
            key={p.sbProdNum}
            sbproduct={p}
            Categories={Categories}
            setUpdateMode={setUpdateMode}
          />
        ) : (
          <SbProductBox key={p.sbProdNum} sbproduct={p} />
        )
      )}
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
    </SbProductWrpper>
  );
};

const SbProductWrpper = styled.div`
  display: flex;
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  align-content: flex-start;
`;

const SbProdBox = styled.div`
  margin: 10px 20px;
  padding: 10px;
  width: 500px;
  border-bottom: 1px solid black;
`;
const InlineContent = styled.div`
  div {
    display: inline-block;
    margin: 5px 15px 10px 0;
    font-size: 1.1rem;
  }
`;
const ImgBox = styled.div`
  display: block;
  float: left;
  margin-right: 15px;
  width: 100px;
  height: 100px;
  overflow: hidden;
  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    object-position: center;
  }
`;
const BlockContent = styled.div`
  margin-bottom: 10px;
  font-size: 1.1rem;
  font-weight: 600;
`;
const BlockContentS = styled.div`
  margin-bottom: 5px;
  font-size: 1rem;
  line-height: 1.3;
  word-break: keep-all;
`;
const Buttonbox = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  button {
    margin-right: 10px;
    padding: 5px 15px;
    background-color: black;
    font-size: 1rem;
    font-weight: 500;
    color: white;
    border: 0;
    cursor: pointer;
  }
`;
const Pagination = styled.div`
  display: inline-block;
  width: 100%;
  height: 30px;
  margin: 20px auto;
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

export default SbProductList;
