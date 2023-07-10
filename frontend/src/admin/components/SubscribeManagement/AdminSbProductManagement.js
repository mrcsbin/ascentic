import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import SbProductList from "./SbProductList";
import SbProductAddModal from "./SbProductAddForm";

const SbProductManagement = () => {
  const [sbProducts, setSbProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [updateMode, setUpdateMode] = useState("");
  const [sortOption, setSortOption] = useState("latest");
  const [rerender, setRerender] = useState("");
  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  const Categories = [
    {
      name: "전체보기",
      text: "all",
    },
    {
      name: "Animal",
      text: "Animal",
    },
    {
      name: "Watery&Powdery",
      text: "Watery&Powdery",
    },
    {
      name: "Woody",
      text: "Woody",
    },
    {
      name: "Mossy",
      text: "Mossy",
    },
    {
      name: "Herbal&Green",
      text: "Herbal&Green",
    },
    {
      name: "Floral",
      text: "Floral",
    },
    {
      name: "Citrus",
      text: "Citrus",
    },
    {
      name: "Fruity",
      text: "Fruity",
    },
    {
      name: "Special",
      text: "Special",
    },
  ];

  function sortByOption(sbProducts, sortOption) {
    if (sortOption === "latest") {
      sbProducts.sort((a, b) => {
        return b.sbProdNum - a.sbProdNum;
      });
    } else if (sortOption === "oldest") {
      sbProducts.sort((a, b) => {
        return a.sbProdNum - b.sbProdNum;
      });
    } else if (sortOption === "moststock") {
      sbProducts.sort((a, b) => {
        return b.sbProdStock - a.sbProdStock;
      });
    } else if (sortOption === "leaststock") {
      sbProducts.sort((a, b) => {
        return a.sbProdStock - b.sbProdStock;
      });
    } else return;
  }

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `http://localhost:8080/subsProduct/list?scentnote=${category}`
        );
        setSbProducts(res.data);
        console.log(res.data);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    fetchProducts();
    setCurrentPage(1);
  }, [category, updateMode, rerender]);

  // 대기 중일 때
  if (loading) {
    // return <Loading isLoading={loading} />;
  }
  // 아직 값이 설정되지 않았을 때
  if (!sbProducts) {
    return null;
  }
  return (
    <>
      <HeaderWrap>
        <HeaderLeft>구독 상품 관리</HeaderLeft>
      </HeaderWrap>
      <InputContainer>
        <CategoriesBox>
          {Categories.map((c) => (
            <button
              key={c.text}
              className={
                escape(c.text) === category ? "activeCateBtn" : "cateBtn"
              }
              onClick={() => setCategory(escape(c.text))}
            >
              {c.name}
            </button>
          ))}
        </CategoriesBox>
        <AddSortBox>
          <button className="addbtn" onClick={() => openModal()}>
            + 구독 상품 추가
          </button>
          <SortBox>
            <button
              className={sortOption === "latest" ? "activeSortbtn" : "sortbtn"}
              onClick={() => {
                setSortOption("latest");
              }}
            >
              최신순
            </button>
            <button
              className={sortOption === "oldest" ? "activeSortbtn" : "sortbtn"}
              onClick={() => {
                setSortOption("oldest");
              }}
            >
              번호순
            </button>
            <button
              className={
                sortOption === "moststock" ? "activeSortbtn" : "sortbtn"
              }
              onClick={() => {
                setSortOption("moststock");
              }}
            >
              재고순
            </button>
            <button
              className={
                sortOption === "leaststock" ? "activeSortbtn" : "sortbtn"
              }
              onClick={() => {
                setSortOption("leaststock");
              }}
            >
              재고적은순
            </button>
          </SortBox>
        </AddSortBox>
        {sbProducts.length === 0 ? (
          <div>로딩중입니다.</div>
        ) : (
          <>
            {sortByOption(sbProducts, sortOption)}
            <SbProductList
              sbProducts={sbProducts}
              setSbProducts={setSbProducts}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              updateMode={updateMode}
              setUpdateMode={setUpdateMode}
              Categories={Categories}
            />
          </>
        )}
      </InputContainer>
      <SbProductAddModal
        open={showModal}
        close={closeModal}
        Categories={Categories}
        setRerender={setRerender}
      />
    </>
  );
};
const HeaderWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin: 0 auto;
  padding-top: 30px;
  border-bottom: 2px solid black;
`;
const HeaderLeft = styled.div`
  padding: 20px 0;
  font-size: 30px;
  font-weight: 600;
`;
const InputContainer = styled.div`
  width: 90%;
  height: 90%;
  margin: 0 auto;
`;
const CategoriesBox = styled.div`
  padding: 0 auto;
  margin-top: 10px;
  width: 100%;
  display: flex;
  justify-content: center;
  button {
    margin: 10px;
    padding: 10px;
    font-size: 1.2rem;
    background-color: white;
    border: 0;
    cursor: pointer;
  }
  .activeCateBtn,
  .cateBtn:hover {
    font-weight: 600;
    border-bottom: 2px solid black;
  }
`;

const AddSortBox = styled.div`
  display: flex;
  width: 80%;
  justify-content: space-between;
  align-items: flex-end;
  margin: 25px auto 10px auto;
  .addbtn {
    margin: 0 10px;
    padding: 10px;
    font-size: 1.1rem;
    font-weight: 500;
    background-color: white;
    border: 1.5px solid black;
    cursor: pointer;
  }
  .addbtn:hover {
    background-color: black;
    color: white;
  }
`;

const SortBox = styled.div`
  display: flex;
  width: fit-content;
  flex-direction: row;
  justify-content: flex-end;
  button {
    font-size: 1rem;
    margin-left: 15px;
    background-color: white;
    border: 0;
    cursor: pointer;
  }
  .activeSortbtn {
    font-weight: 700;
  }
`;

export default SbProductManagement;
