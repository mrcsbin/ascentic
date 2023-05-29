import { useState } from "react";
import styled from "styled-components";
import { ProductSalesAmountByType } from "./product/ProductSalesAmountByType";
import { AllProductSalesAmount } from "./product/AllProductSalesAmount";

export const ProductAnalysis = () => {
  const [activeTab, setActiveTab] = useState("종류별 매출");
  const [activeSubTab, setActiveSubTab] = useState(1);
  const [productType, setProductType] = useState("category");
  const [dateType, setDateType] = useState("year");

  return (
    <>
      <HeaderWrap>
        <HeaderLeft>상품 매출 통계</HeaderLeft>
        <HeaderRight>
          <Tab
            onClick={() => {
              setActiveTab("종류별 매출");
              setProductType("category");
            }}
            className={activeTab === "종류별 매출" ? "active" : ""}
          >
            <TabName
              onClick={() => {
                setActiveSubTab(1);
                setDateType("year");
              }}
            >
              종류별 매출
            </TabName>
            <SubTab>
              <SubTabName
                className={activeSubTab === 1 ? "active" : ""}
                onClick={() => {
                  setDateType("year");
                  setActiveSubTab(1);
                }}
              >
                연도별 매출
              </SubTabName>
              <SubTabName
                className={activeSubTab === 2 ? "active" : ""}
                onClick={() => {
                  setDateType("month");
                  setActiveSubTab(2);
                }}
              >
                월별 매출
              </SubTabName>
            </SubTab>
          </Tab>

          <Tab
            onClick={() => {
              setActiveTab("향별 매출");
              setProductType("scent");
            }}
            className={activeTab === "향별 매출" ? "active" : ""}
          >
            <TabName
              onClick={() => {
                setActiveSubTab(3);
                setDateType("year");
              }}
            >
              향별 매출
            </TabName>
            <SubTab>
              <SubTabName
                className={activeSubTab === 3 ? "active" : ""}
                onClick={() => {
                  setDateType("year");
                  setActiveSubTab(3);
                }}
              >
                연도별 매출
              </SubTabName>
              <SubTabName
                className={activeSubTab === 4 ? "active" : ""}
                onClick={() => {
                  setDateType("month");
                  setActiveSubTab(4);
                }}
              >
                월별 매출
              </SubTabName>
            </SubTab>
          </Tab>

          <Tab
            onClick={() => {
              setActiveTab("전체 매출");
            }}
            className={activeTab === "전체 매출" ? "active" : ""}
          >
            <TabName
              onClick={() => {
                setActiveSubTab(5);
                setDateType("year");
              }}
            >
              전체 매출
            </TabName>
            <SubTab>
              <SubTabName
                className={activeSubTab === 5 ? "active" : ""}
                onClick={() => {
                  setDateType("year");
                  setActiveSubTab(5);
                }}
              >
                연도별 매출
              </SubTabName>
              <SubTabName
                className={activeSubTab === 6 ? "active" : ""}
                onClick={() => {
                  setDateType("month");
                  setActiveSubTab(6);
                }}
              >
                월별 매출
              </SubTabName>
              <SubTabName
                className={activeSubTab === 7 ? "active" : ""}
                onClick={() => {
                  setDateType("day");
                  setActiveSubTab(7);
                }}
              >
                일별 매출
              </SubTabName>
            </SubTab>
          </Tab>
        </HeaderRight>
      </HeaderWrap>
      {(activeTab === "종류별 매출" || activeTab === "향별 매출") && (
        <>
          <ProductSalesAmountByType
            productType={productType}
            dateType={dateType}
          />
        </>
      )}
      {activeTab === "전체 매출" && (
        <>
          <AllProductSalesAmount dateType={dateType} />
        </>
      )}
    </>
  );
};

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
`;

const SubTab = styled.div`
  display: none;
  position: absolute;
  width: 100%;
  z-index: 10;
`;

const SubTabName = styled.div`
  font-weight: 400;
  padding: 10px 0;
  &.active {
    font-weight: bold;
  }
  &:hover {
    font-weight: bold;
  }
`;

const Tab = styled.div`
  /* margin-left: 20px; */
  width: 100px;
  text-align: center;
  position: relative;
  cursor: pointer;
  &.active {
    font-weight: bold;
  }
  &:hover {
    font-weight: bold;
  }
  &:hover ${SubTab} {
    display: block;
  }
`;

const TabName = styled.div``;
