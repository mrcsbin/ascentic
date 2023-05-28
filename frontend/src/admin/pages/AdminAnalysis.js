import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { ProductAnalysis } from "../components/analysis/ProductAnalysis";
import { MemberAnalysis } from "../components/analysis/MemberAnalysis";
import { SubsCribe } from "../components/analysis/Subscribe";

const AdminAnalysis = () => {
  const params = useParams();

  return (
    <Wrap>
      {params.category === "product" && <ProductAnalysis />}
      {params.category === "member" && <MemberAnalysis />}
      {params.category === "subscribe" && <SubsCribe />}
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
