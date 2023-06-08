import axios from "axios";
import React, { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import ProductCard from "../components/common/storemain/ProductCard";

const InfiniteScroll = () => {
  const [category, setCategory] = useState("all");
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const observerRef = useRef(null);

  useEffect(() => {
    setProducts([]);
    setPage(0);
  }, [category]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/listscent", {
          params: {
            category: category,
            page: page,
            pageSize: 12,
          },
        });
        const newProducts = response.data;
        setProducts((prevProducts) => [...prevProducts, ...newProducts]);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, page]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const handleIntersection = (entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    const observer = new IntersectionObserver(handleIntersection, options);
    observerRef.current = observer;

    if (observerRef.current) {
      observerRef.current.observe(document.querySelector("#observer"));
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);
  console.log(products)

  return (
    <div>
      <CardBox>
        {products.map((item, index) => {
          return <ProductCard key={index} product={item} />;
        })}

        {/* 로딩 상태에 따라 로딩 표시를 보여줄 수 있음 */}
        {loading && <div>Loading...</div>}

        {/* Intersection Observer의 타겟 요소 */}
        <div id="observer" style={{ height: "10px" }}></div>
      </CardBox>
    </div>
  );
};

export default InfiniteScroll;

const CardBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 90vw;
  height: fit-content;
  max-width: 1200px;
  margin: 0 auto;
  @media screen and (max-width: 984px) {
    justify-content: center;
  }
`;
