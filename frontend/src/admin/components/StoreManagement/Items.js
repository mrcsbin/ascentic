import React, { useState } from "react";
import styled from "styled-components";

const Items = ({ item, index, hadleOpenEditModal }) => {
  return (
    <Content>
      <ProdNum>{item.prodNum}</ProdNum>
      <ProdImage>
        <img
          src={`http://localhost:8080/images/${item.prodImage}`}
          alt="상품 이미지"
        ></img>
      </ProdImage>
      <ProdName>{item.prodName}</ProdName>
      <ScentName>{item.scentName}</ScentName>
      <ProdPrice>{item.prodPrice.toLocaleString()}원</ProdPrice>
      <ProdCategory>{item.prodCategory}</ProdCategory>
      <ProdStock>{item.prodStock}개</ProdStock>
      <ProdOption>
        {item.options.map((option, index) => (
          <div key={index}>
            {option}
            {index !== item.options.length - 1 && "/"}{" "}
          </div>
        ))}
      </ProdOption>
      <ProdDate>{item.prodDate}</ProdDate>
      <EditBtn>
        <button onClick={() => hadleOpenEditModal(item.prodNum)}>수정</button>
      </EditBtn>
    </Content>
  );
};

const Content = styled.div`
  font-size: 16px;
  display: flex;
  height: 100px;
  border-bottom: 1px solid black;
`;

const ProdNum = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 3%;
`;

const ProdImage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 10%;
  > img {
    width: 70px;
    height: 70px;
  }
`;

const ProdName = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 12%;
`;

const ScentName = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 13%;
`;

const ProdPrice = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 10%;
`;

const ProdCategory = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 10%;
`;

const ProdStock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 10%;
`;

const ProdOption = styled.div`
  display: flex;
  /* flex-direction: column; */
  align-items: center;
  justify-content: center;
  width: 15%;
`;

const ProdDate = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 10%;
`;

const EditBtn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 5%;

  > button {
    width: 50px;
    height: 30px;
    background-color: black;
    color: white;
    cursor: pointer;
  }
`;

export default Items;
