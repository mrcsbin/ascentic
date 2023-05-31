import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import ProdList from "../components/StoreManagement/ProdList";
import ProdAdd from "../components/StoreManagement/ProdAdd";

function AdminStoreManagement() {
  const params = useParams();

  return (
    <Wrap>
      {params.category === "list" && <ProdList />}
      {params.category === "post" && <ProdAdd />}
    </Wrap>
  );
}

const Wrap = styled.div`
  display: block;
  float: right;
  margin: 0;
  width: 85%;
`;

export default AdminStoreManagement;
