import React, { useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { ProductAnalysis } from "../components/analysis/ProductAnalysis";
import { MemberAnalysis } from "../components/analysis/MemberAnalysis";

const AdminAnalysis = () => {
  const params = useParams();

  return (
    <Wrap>
      {params.category === "product" && <ProductAnalysis />}
      {params.category === "member" && <MemberAnalysis />}
      {params.category === "subscribe" && <div>안녕하다!!!</div>}
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
