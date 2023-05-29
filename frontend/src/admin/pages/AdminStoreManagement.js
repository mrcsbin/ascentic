import React, { useState } from "react";
import StoreManageCategories from "../components/StoreManagement/StoreManageCategories";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import ProdList from "../components/StoreManagement/ProdList";
import ProdEditModal from "../components/StoreManagement/ProdEditModal";
import ProdAddModal from "../components/StoreManagement/ProdAddModal";

function AdminStoreManagement() {
  const params = useParams();
  const category = params.category || "all";

  const [products, setProducts] = useState([]);

  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isOpenAddModal, setIsOpenAddMoadl] = useState(false);
  const [selectProdNum, setSelectProdNum] = useState(0);

  const hadleOpenEditModal = (prodNum) => {
    setSelectProdNum(prodNum);
    setIsOpenAddMoadl(false);
    setIsOpenEditModal(true);
  };

  const hadleCloseEditModal = () => {
    setIsOpenEditModal(false);
  };

  const hadleOpenAddModal = (prodNum) => {
    setIsOpenEditModal(false);
    setIsOpenAddMoadl(true);
  };

  const hadleCloseAddModal = () => {
    setIsOpenAddMoadl(false);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/admingetprodlist?category=${category}`
        );
        setProducts(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchProducts();
  }, [category, isOpenEditModal, isOpenAddModal]);

  return (
    <Wrapper>
      <Categorie>
        <StoreManageCategories />
      </Categorie>
      <ProdListContain>
        <ProdList
          products={products}
          hadleOpenEditModal={hadleOpenEditModal}
          hadleOpenAddModal={hadleOpenAddModal}
        />
      </ProdListContain>
      {isOpenEditModal && (
        <ProdEditModal
          prodNum={selectProdNum}
          hadleCloseEditModal={hadleCloseEditModal}
        />
      )}
      {isOpenAddModal && (
        <ProdAddModal hadleCloseAddModal={hadleCloseAddModal} />
      )}
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
