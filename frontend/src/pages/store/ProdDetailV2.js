import "../../styles/ProdDetail.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import ProdDetailViewV2 from "../../components/ProdDetailViewV2";
import { useParams } from "react-router-dom";

const ProductDetailPageV2 = () => {
  const [productData, setProductData] = useState({});
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const prodNum = params.prod_num;
  useEffect(() => {
    const fetchOption = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/proddetail/${prodNum}`
        );
        console.log(res.data);
        setProductData(res.data);
      } finally {
        setLoading(false);
      }
    };
    fetchOption();
  }, []);

  // 대기 중일 때
  if (loading) {
    return <div>Loading... {prodNum}</div>;
  }

  // 값 아직 설정되지 않았을 때
  if (loading === true) {
    console.log("Loadddddding...");
    return <div>Loadddddding... </div>;
  }

  // 값 유효할 때
  return <ProdDetailViewV2 productData={productData} />;
};

const ProdDetailV2 = ({ prod_num }) => {
  return <ProductDetailPageV2 prod_num={prod_num} />;
};

export default ProdDetailV2;
