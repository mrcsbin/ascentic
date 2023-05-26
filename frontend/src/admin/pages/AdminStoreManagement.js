import React, { useState } from "react";
import StoreManageCategories from "../components/StoreManagement/StoreManageCategories";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import ProdList from "../components/StoreManagement/ProdList";

function AdminStoreManagement() {
  const params = useParams();
  const category = params.category || "all";

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/admingetprodlist?category=${category}`
        );
        console.log("hh");
        console.log(res.data);
        setProducts(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchProducts();
  }, [category]);

  return (
    <Wrapper>
      <Categorie>
        <StoreManageCategories></StoreManageCategories>
      </Categorie>
      <ProdListContain>
        <ProdList products={products}></ProdList>
      </ProdListContain>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  /* background-color: red; */
`;

const Categorie = styled.div`
  padding-top: 50px;
`;

const ProdListContain = styled.div`
  width: 75%;
  margin: 0 18%;
  /* background-color: blue; */
`;

export default AdminStoreManagement;
