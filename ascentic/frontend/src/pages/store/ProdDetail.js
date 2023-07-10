import "../../styles/ProdDetail.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import ProdDetailView from "../../components/productdetail/ProdDetailView";
import { useParams } from "react-router-dom";
import Loading from "../../components/common/Loading";
import { getCookie } from "../../utils/Cookies";

const ProductDetailPage = () => {
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const prodNum = params.prod_num;

  useEffect(() => {
    const fetchOption = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/proddetail/${prodNum}`,
          {
            headers: {
              Authorization: "Bearer " + getCookie("accessToken"),
            },
          }
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
    return <Loading />;
  }

  // 값 아직 설정되지 않았을 때
  if (productData == null) {
    return <Loading />;
  }

  // 값 유효할 때
  return <ProdDetailView productData={productData} />;
};

const ProdDetail = ({ prod_num }) => {
  return <ProductDetailPage prod_num={prod_num} />;
};

export default ProdDetail;
