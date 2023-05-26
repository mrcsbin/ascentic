import React, { useState } from "react";
import styled from "styled-components";
import { ProductSalesAmountByType } from "../components/analysis/product/ProductSalesAmountByType";
import { AllProductSalesAmount } from "../components/analysis/product/AllProductSalesAmount";

const AdminAnalysis = () => {
  const [productType, setProductType] = useState("category");
  const [dateType, setDateType] = useState("year");
  const [groupMode, setGroupMode] = useState(false);
  const [allDateType, setAllDateType] = useState("year");

  return (
    <Wrap>
      <ProductSalesAmountByType
        productType={productType}
        dateType={dateType}
        groupMode={groupMode}
      />
      <TempButtonBox>
        <button
          onClick={() => {
            setProductType("category");
            setDateType("year");
          }}
        >
          Category - Year!!
        </button>
        <button
          onClick={() => {
            setProductType("category");
            setDateType("month");
          }}
        >
          Category - Month!!
        </button>
        <button
          onClick={() => {
            setProductType("scent");
            setDateType("year");
          }}
        >
          Scent - Year!!
        </button>
        <button
          onClick={() => {
            setProductType("scent");
            setDateType("month");
          }}
        >
          Scent - Month!!
        </button>
      </TempButtonBox>
      <TempButtonBox>
        <button
          onClick={() => {
            setGroupMode(false);
          }}
        >
          TotalMode!!!
        </button>
        <button
          onClick={() => {
            setGroupMode(true);
          }}
        >
          GroupMode!!!
        </button>
      </TempButtonBox>
      <AllProductSalesAmount dateType={allDateType}></AllProductSalesAmount>
      <TempButtonBox>
        <button
          onClick={() => {
            setAllDateType("year");
          }}
        >
          All - Year!!
        </button>
        <button
          onClick={() => {
            setAllDateType("month");
          }}
        >
          All - Month!!
        </button>
        <button
          onClick={() => {
            setAllDateType("day");
          }}
        >
          All - day!!
        </button>
      </TempButtonBox>
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

const TempButtonBox = styled.div`
  margin: 0 auto;
  text-align: center;
`;
