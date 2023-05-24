import "../../styles/ProdDetail.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import ProdDetailView from "../../components/ProdDetailView";
import { useParams } from "react-router-dom";
import Loading from "../../components/common/Loading";
import { getCookie } from "../../utils/Cookies";

const ProductDetailPage = () => {
  const [productData, setProductData] = useState(null);
  const [productOption, setProductOption] = useState([]);
  const [isWish, setIsWish] = useState();
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const prodNum = params.prod_num;

  //Product Option 데이터 받아오기
  // useEffect(() => {
  //   const fetchOption = async () => {
  //     try {
  //       const res = await axios
  //         .get(`http://localhost:8080/prodOption/${prodNum}`)
  //         .then(function (res) {
  //           setProductOption(res.data);
  //           setProductData(res.data[0].product);
  //         });
  //     } catch (e) {
  //       console.log(e);
  //     }
  //     setLoading(false);
  //   };
  //   fetchOption();
  // }, []);
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

  //product 데이터 받아오기
  // useEffect(() => {
  //   const fetchProductData = async () => {
  //     try {
  //       const res = await axios.get(
  //         `http://localhost:8080/prodDetail/${prodNum}`,
  //         {
  //           headers: {
  //             'Access-Control-Allow-Headers': '*',
  //             'content-type': 'application/json',
  //           },
  //         }
  //       );
  //       console.log(res.data);
  //       setProductData(res.data);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //     setLoading(false);
  //   };
  //   fetchProductData();
  // }, []);

  // isWish 데이터 받아오기  --- memberId가 필요함
  // useEffect(() => {
  //   const fetchData = async (prodImgType) => {
  //     try {
  //       const res = await axios.get(
  //         `//iswish?prodNum=${prodNum}&memberId=${memberId}`
  //       );
  //       setIsWish(res.data);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //     setLoading(false);
  //   };
  //   return fetchData(0);
  // }, [prodNum]);

  // 대기 중일 때
  if (loading) {
    return <Loading />;
  }

  // 값 아직 설정되지 않았을 때
  if (productData == null || productOption == null) {
    // console.log("Loadddddding...");
    return <Loading />;
  }

  // 값 유효할 때
  return (
    <ProdDetailView productData={productData} productOption={productOption} />
  );
  //{To-Do} isWish도 넘겨줘야 됨
};

const ProdDetail = ({ prod_num }) => {
  return <ProductDetailPage prod_num={prod_num} />;
};

export default ProdDetail;
