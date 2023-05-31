import React from "react";
import SbProductManagement from "../components/SubscribeManagement/AdminSbProductManagement";
import styled from "styled-components";
import { useParams } from "react-router-dom";

function AdminSubscribeManagement() {
  const params = useParams();
  const category = params.category;

  return (
    <Wrapper>
      <div>
        {category === "member" && <div />}
        {category === "product" && <SbProductManagement />}
      </div>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  width: 85%;
  float: right;
`;

export default AdminSubscribeManagement;
