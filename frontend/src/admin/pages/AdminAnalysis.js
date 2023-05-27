import React, { useState } from "react";
import styled from "styled-components";
import { ProductSalesAmountByType } from "../components/analysis/product/ProductSalesAmountByType";
import { AllProductSalesAmount } from "../components/analysis/product/AllProductSalesAmount";
import { useParams } from "react-router-dom";

const AdminAnalysis = () => {
  const params = useParams();
  const [activeTab, setActiveTab] = useState("상품 종류");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  if (params.category === "member") {
    return (
      <Wrap>
        <div>안녕하다!!!</div>
      </Wrap>
    );
  }

  if (params.category === "subscribe") {
    return (
      <Wrap>
        <div>안녕하다!!!</div>
      </Wrap>
    );
  }

  return (
    <Wrap>
      {params.category === "product" && (
        <>
          <HeaderWrap>
            <HeaderLeft>상품 매출 통계</HeaderLeft>
            <HeaderRight>
              <div
                onClick={() => handleTabClick("상품 종류")}
                className={activeTab === "상품 종류" ? "active" : ""}
              >
                상품 종류
              </div>
              <div
                onClick={() => handleTabClick("상품 향")}
                className={activeTab === "상품 향" ? "active" : ""}
              >
                상품 향
              </div>
              <div
                onClick={() => handleTabClick("상품")}
                className={activeTab === "상품" ? "active" : ""}
              >
                상품
              </div>
            </HeaderRight>
          </HeaderWrap>
          {activeTab === "상품 종류" && (
            <>
              <ProductSalesAmountByType productType={"category"} />
            </>
          )}
          {activeTab === "상품 향" && (
            <>
              <ProductSalesAmountByType productType={"scent"} />
            </>
          )}
          {activeTab === "상품" && (
            <>
              <AllProductSalesAmount />
            </>
          )}
        </>
      )}
    </Wrap>
  );
};

export default AdminAnalysis;

const Wrap = styled.div`
  display: block;
  float: right;
  margin: 0;
  width: 85%;
`;

const HeaderWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin: 0 auto;
  padding-top: 50px;
  border-bottom: 2px solid black;
`;

const HeaderLeft = styled.div`
  padding: 20px 0;
  font-size: 30px;
  font-weight: 700;
`;

const HeaderRight = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: end;
  padding-bottom: 5px;
  > div {
    margin-left: 20px;
    cursor: pointer;
    &.active {
      font-weight: bold;
    }
  }
`;
