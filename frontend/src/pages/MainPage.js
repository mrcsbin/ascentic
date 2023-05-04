import axios from "axios";
import "../assets/styles/main-page.css";
import Loading from "../components/common/Loading";
import Skeleton from "react-loading-skeleton";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ProductCardMain from "../components/main/ProductCardMain";

const Carousel = styled.div`
  background: url(https://d38cxpfv0ljg7q.cloudfront.net/content_images/contents_images-1663250259447-2.jpg);
  background-size: cover;
  background-position: center;
  height: 300px;
  width: 100%;
  margin: 0 auto;
`;

const ThreeBox = () => {
  return (
    <div className="container">
      <ul className="boxWrap">
        <li className="box">
          <a href="/탁주" className="type">
            <img></img>
          </a>
          <p>탁주</p>
        </li>
        <li className="box">
          <a href="/증류주" className="type">
            <img></img>
          </a>
          <p>증류주</p>
        </li>
        <li className="box">
          <a href="/과실주" className="type">
            <img></img>
          </a>
          <p>과실주</p>
        </li>
      </ul>
    </div>
  );
};

const MainPage = () => {
  const [alcohol, setAlcohol] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:8080/list");
        setAlcohol(res.data);
        // console.log(res.data);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  // 대기 중일 때
  if (loading) {
    return <Loading isLoading={loading} />;
  }
  // 아직 값이 설정되지 않았을 때
  if (!alcohol) {
    return null;
  }

  // 값이 유효할 때
  return (
    <div>
      <Carousel />
      <ThreeBox />
      <ProductCardMain alcohol={alcohol} />
    </div>
  );
};

export default MainPage;
