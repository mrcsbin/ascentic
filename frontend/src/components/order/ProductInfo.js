import React from "react";
import styled from "styled-components";

// 주문 상품 정보
const ProductInfo = ({ item, key }) => {
  // const prods = props.prods;
  function addComma(num) {
    var regexp = /\B(?=(\d{3})+(?!\d))/g;
    return num.toString().replace(regexp, ",");
  }

  //   return (
  //     <ProdContainer>
  //       {products.map((product) => (
  //         <ProdInfoContainer key={product.prodNum}>
  //           <ProdImage
  //             src={`http://localhost:8080/images/${product.productImage}`}
  //             alt="상품 이미지"
  //           />
  //           <PurchaseInfoContainer>
  //             <ProdName>상품명: {product.prodName}</ProdName>
  //             <ProdOption>옵션명: {product.prodOption}</ProdOption>
  //             <ProdQuantity>수량: {product.prodQuantity}개</ProdQuantity>
  //           </PurchaseInfoContainer>
  //           <ProdPrice>{addComma(product.prodPrice)} 원</ProdPrice>
  //         </ProdInfoContainer>
  //       ))}
  //     </ProdContainer>
  //   );
  // };

  return (
    <>
      <ProdContainer>
        <ProdInfoContainer key={key}>
          <ProdImage
            src={`http://localhost:8080/images/${item.prodImage}`}
            alt="상품 이미지"
          />
          <PurchaseInfoContainer>
            <ProdName>상품명: {item.prodName}</ProdName>
            <ProdOption>옵션명: {item.prodOption}</ProdOption>
            <ProdQuantity>수량: {item.prodCount}개</ProdQuantity>
          </PurchaseInfoContainer>
          <ProdPrice>{addComma(item.prodPrice * item.prodCount)} 원</ProdPrice>
        </ProdInfoContainer>
      </ProdContainer>
    </>
  );
};

export default ProductInfo;

const ProdContainer = styled.div`
  /* display: flex; */
`;

const ProdInfoContainer = styled.div`
  display: flex;
  margin-left: 30px;
  width: 625px;
  border-bottom: 1px solid #d9d9d9;
  margin-top: 20px;
  margin-bottom: 30px;
  padding: 10px;
`;

const ProdImage = styled.img`
  width: 99px;
  height: 99px;
  margin-right: 20px;
`;

const PurchaseInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ProdName = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const ProdOption = styled.div`
  font-size: 16px;
  margin-bottom: 5px;
`;

const ProdQuantity = styled.div`
  font-size: 16px;
  margin-bottom: 5px;
`;

const ProdPrice = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-left: auto;
`;
