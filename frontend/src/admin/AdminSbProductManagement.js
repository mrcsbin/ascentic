import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const SbProductManagement = () => {
  const [sbProducts, setSbProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("all");

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
      name: "Watery & Powdery",
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
      name: "Herbal & Green",
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
  function handleCategory(data) {
    setCategory(data);
  }
  function updateSbProduct(data) {
    setCategory(data);
  }
  function deleteSbProduct(data) {
    setCategory(data);
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
  }, [category]);

  // 대기 중일 때
  if (loading) {
    // return <Loading isLoading={loading} />;
  }
  // 아직 값이 설정되지 않았을 때
  if (!sbProducts) {
    return null;
  }
  //sbProducts.length===0으로 로딩처리 필요..
  return (
    <>
      <Categories>
        {Categories.map((c) => (
          <button
            key={c.text}
            className={category === c.text ? "activeCateBtn" : "cateBtn"}
            onClick={handleCategory(c.text)}
          >
            {c.name}
          </button>
        ))}
      </Categories>
      <button>구독 상품 추가</button>

      {sbProducts.length === 0 ? (
        <div>로딩중입니다.</div>
      ) : (
        <SbProductWrpper>
          {sbProducts.map((p) => (
            <SbProdBox>
              <div>
                <img src={`/images/${p.sbProdImage}`} alt="sbProdImage" />
              </div>
              <div>{p.Scent.scentName}</div>
              <div>{p.sbProdPrice}</div>
              <div>{p.sbProdIntro}</div>
              <Buttonbox>
                <button onClick={updateSbProduct(p.sbProdNum)}>수정</button>
                <button onClick={deleteSbProduct(p.sbProdNum)}>삭제</button>
              </Buttonbox>
            </SbProdBox>
          ))}
        </SbProductWrpper>
      )}
    </>
  );
};

const Categories = styled.div`
  button {
  }
  .cateBtn {
  }
  .activeCateBtn {
  }
`;

const SbProductWrpper = styled.div``;

const SbProdBox = styled.div``;

const Buttonbox = styled.div``;

export default SbProductManagement;
