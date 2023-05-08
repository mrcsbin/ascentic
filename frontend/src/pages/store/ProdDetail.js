import '../../styles/ProdDetail.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProdDetailView from '../../components/ProdDetailView';
import { useParams } from 'react-router-dom';

const ProductDetailPage = () => {
  return <ProdDetailView />;

  const [productData, setProductData] = useState();
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const prod_num = params.prod_num;

  //데이터 받아오기
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await axios.get(
  //         `http://localhost:8080/prodDetail/prod_num?${prod_num}`
  //       );
  //       console.log(res.data);
  //       setProductData(res.data);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //     setLoading(false);
  //   };
  //   fetchData();
  // }, [prod_num]);

  // 대기 중일 때
  if (loading) {
    return <div>Loading... {prod_num}</div>;
  }

  // 값 아직 설정되지 않았을 때
  if (!productData) {
    return <div>Loadddddding... </div>;
  }

  // 값 유효할 때
  return <ProdDetailView productData={productData} />;
};

const ProdDetail = ({ prod_num }) => {
  // return <ProductDetailPage></ProductDetailPage>;
  return <ProdDetailView />;
  // return <div>dsafdsafsdaf</div>;
  // return <ProductDetailPage prod_num={prod_num} />;
};

export default ProdDetail;
