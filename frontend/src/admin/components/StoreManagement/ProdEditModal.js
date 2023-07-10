import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { categories, prodState, scentNames } from "./ProdSelectData";

const ProdEditModal = ({ prodNum, hadleCloseEditModal }) => {
  const [productInfo, setProductInfo] = useState({
    prodNum: 0,
    prodName: "",
    scentName: "Ambergris",
    prodCategory: "향수",
    prodState: "판매중",
    prodInfo: "",
    options: [
      {
        prodOption: "",
        prodPrice: 0,
        optionState: "판매중",
        prdStock: 0,
      },
    ],
  });

  // 옵션 추가 버튼 클릭 시 실행
  const handleAddOption = () => {
    if (productInfo.options.length > 2) {
      alert("옵션이 너무 많습니다.");
      return;
    }
    setProductInfo((prevProductInfo) => ({
      ...prevProductInfo,
      options: [
        ...prevProductInfo.options,
        { prodOption: "", prodPrice: "", prodStock: "", optionState: "판매중" },
      ],
    }));
  };

  // 옵션 삭제 버튼 클릭 시 실행
  const handleDeleteOption = (index) => {
    setProductInfo((prevProductInfo) => {
      const updatedOptions = prevProductInfo.options.filter(
        (_, i) => i !== index
      );
      return {
        ...prevProductInfo,
        options: updatedOptions,
      };
    });
  };

  // 옵션 정보 업데이트
  const handleOptionChange = (e, index, field) => {
    if (field === "prodPrice" || field === "prodStock") {
      if (!/^\d*$/.test(e.target.value)) {
        alert("숫자만 올 수 있습니다.");
        return;
      }
    }

    const updatedOptions = productInfo.options.map((option, i) => {
      if (i === index) {
        return {
          ...option,
          [field]: e.target.value,
        };
      }
      return option;
    });

    setProductInfo((prevProductInfo) => ({
      ...prevProductInfo,
      options: updatedOptions,
    }));
  };

  // 정보 업데이트
  const handleChange = (e, field) => {
    setProductInfo((prevProductInfo) => ({
      ...prevProductInfo,
      [field]: e.target.value,
    }));
  };

  // 수정 버튼 클릭시
  const handleEdit = () => {
    const { prodName, scentName, prodCategory, prodInfo, options } =
      productInfo;

    // 상품 정보 검사
    const isEmptyProductInfo = [
      prodName,
      scentName,
      prodCategory,
      prodInfo,
    ].some((value) => value === "");

    if (isEmptyProductInfo) {
      alert("상품 정보를 입력하세요");
      return;
    }

    // options 검사
    if (options.length === 0) {
      alert("옵션은 반드시 하나 이상 입력 해야합니다!");
      return;
    }

    const isEmptyOptions = options.some((option) => {
      const { prodOption, prodPrice, prodStock } = option;
      return prodOption === "" || prodPrice === "" || prodStock === "";
    });

    if (isEmptyOptions) {
      alert("모든 옵션를 입력해주세요!");
      return;
    }

    const updateProduct = async () => {
      try {
        await axios.post(`http://localhost:8080/adminProdUpdate`, productInfo);
        alert("상품 정보가 수정되었습니다!");
        window.location.reload();
      } catch (e) {
        console.log(e);
      }
    };
    updateProduct();

    hadleCloseEditModal();
  };

  const [optionLen, setOptionLen] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/admingetProdUpdateInfo?prodNum=${prodNum}`
        );
        setOptionLen(res.data.options.length);
        setProductInfo(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
      <ModalBackground />
      <ModalContainer>
        <button className="close" onClick={() => hadleCloseEditModal()}>
          &times;
        </button>
        <InputContainer>
          <ProdInputContainer>
            <OneInputContainer>
              <Label>제품명</Label>
              <NameInput
                type="text"
                value={productInfo.prodName}
                onChange={(e) => handleChange(e, "prodName")}
              ></NameInput>
            </OneInputContainer>
            <OneInputContainer>
              <Label>향이름</Label>
              <SelectInput
                value={productInfo.scentName}
                onChange={(e) => handleChange(e, "scentName")}
              >
                {scentNames.map((scent, index) => (
                  <option key={index} value={scent}>
                    {scent}
                  </option>
                ))}
              </SelectInput>
            </OneInputContainer>
            <OneInputContainer>
              <Label>분류</Label>
              <SelectInput
                value={productInfo.prodCategory}
                onChange={(e) => handleChange(e, "prodCategory")}
              >
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </SelectInput>
            </OneInputContainer>
            <BigOneInputContainer>
              <Label>제품 설명</Label>
              <ProdInfoInput
                value={productInfo.prodInfo}
                onChange={(e) => handleChange(e, "prodInfo")}
              ></ProdInfoInput>
            </BigOneInputContainer>
          </ProdInputContainer>
          <OptionContainer>
            <OneInputContainer>
              <Label>옵션 추가</Label>
              <OptionInfoLabel>옵션명</OptionInfoLabel>
              <OptionInfoLabel>가격</OptionInfoLabel>
              <OptionInfoLabel>재고</OptionInfoLabel>
              <OptionInfoLabel>상태</OptionInfoLabel>
              <DelLabel>삭제</DelLabel>
            </OneInputContainer>
            {productInfo.options.map((option, index) => (
              <div key={index}>
                <OptionOneInputContainer>
                  <Label>옵션{index + 1}</Label>
                  <OneOptionInput>
                    <InputOption
                      type="text"
                      value={option.prodOption}
                      onChange={(e) =>
                        handleOptionChange(e, index, "prodOption")
                      }
                    />
                  </OneOptionInput>
                  <OneOptionInput>
                    <InputOption
                      type="text"
                      value={option.prodPrice}
                      onChange={(e) =>
                        handleOptionChange(e, index, "prodPrice")
                      }
                    />
                    원
                  </OneOptionInput>
                  <OneOptionInput>
                    <InputOption
                      type="text"
                      value={option.prodStock}
                      onChange={(e) =>
                        handleOptionChange(e, index, "prodStock")
                      }
                    />
                    개
                  </OneOptionInput>
                  <OneOptionInput>
                    <OptionStateSelect
                      value={option.optionState}
                      onChange={(e) =>
                        handleOptionChange(e, index, "optionState")
                      }
                    >
                      {prodState.map((state, index) => (
                        <option key={index} value={state}>
                          {state}
                        </option>
                      ))}
                    </OptionStateSelect>
                  </OneOptionInput>
                  {index > optionLen - 1 ? (
                    <OptionDelBtn onClick={() => handleDeleteOption(index)}>
                      -
                    </OptionDelBtn>
                  ) : (
                    <div>삭제불가</div>
                  )}
                </OptionOneInputContainer>
              </div>
            ))}
            <OptionAddBtn onClick={() => handleAddOption()}>+</OptionAddBtn>
          </OptionContainer>
          <EditBtnContainer>
            <EditBtn onClick={() => handleEdit()}>수정</EditBtn>
            <CloseBtn onClick={() => hadleCloseEditModal()}>취소</CloseBtn>
          </EditBtnContainer>
        </InputContainer>
      </ModalContainer>
    </>
  );
};

export default ProdEditModal;

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1000;
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 800px;
  height: 830px;
  background-color: white;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 30px;
  .close {
    position: absolute;
    top: 3%;
    right: 5%;
    padding: 0;
    font-size: 2rem;
    background-color: white;
    border: 0;
    cursor: pointer;
  }
  input,
  select,
  textarea {
    font-size: 1rem;
    padding-left: 10px;
    line-height: 1.5;
  }
`;

const InputContainer = styled.div`
  width: 80%;
  height: 90%;
  font-size: 1rem;
`;

const ProdInputContainer = styled.div`
  width: 100%;
  height: 45%;
`;

const OptionContainer = styled.div`
  width: 100%;
  height: 50%;
`;

const OneInputContainer = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  margin-top: 10px;
`;

const Label = styled.div`
  width: 12%;
  font-size: 16px;
  font-weight: 600;
  margin-right: 10px;
`;

const NameInput = styled.input`
  width: 90%;
  height: 80%;
  border: 1px solid;
`;

const SelectInput = styled.select`
  width: 90%;
  height: 80%;
  border: 1px solid;
`;

const BigOneInputContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
`;

const ProdInfoInput = styled.textarea`
  width: 90%;
  height: 100px;
  resize: none;
  border: 1px solid;
`;

const OptionOneInputContainer = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  margin-bottom: 5px;
  align-items: center;
`;

const OptionInfoLabel = styled.div`
  width: 20%;
  text-align: center;
  padding: 10px 0;
  border-top: 1px solid gray;
  border-bottom: 1px solid gray;
  background-color: rgba(250, 250, 250, 1);
`;

const DelLabel = styled.div`
  width: 8%;
  text-align: center;
  padding: 10px 0;
  border-top: 1px solid gray;
  border-bottom: 1px solid gray;
  background-color: rgba(250, 250, 250, 1);
`;

const OneOptionInput = styled.div`
  width: 20%;
`;

const InputOption = styled.input`
  width: 70%;
  height: 30px;
  gap: 10px;
  border: 1px solid;
`;

const OptionStateSelect = styled.select`
  width: 70%;
  height: 30px;
  border: 1px solid;
`;

const OptionDelBtn = styled.button`
  /* width: 8%; */
  margin-left: 0.7%;
  font-size: 20px;
  background-color: white;
  color: red;
  border: 1.5px solid red;
  border-radius: 50%;
  cursor: pointer;
  text-align: center;
`;

const OptionAddBtn = styled.button`
  cursor: pointer;
  font-size: 25px;
  margin-left: 45%;
  border: 1.5px solid gray;
  border-radius: 50%;
  background-color: white;
  text-align: center;
`;

const EditBtnContainer = styled.div`
  width: 100%;
  height: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  button {
    width: 150px;
    height: 40px;
    font-size: 1.1rem;
    font-weight: 500;
    border: 1.5px solid black;
    cursor: pointer;
  }
`;
const CloseBtn = styled.button`
  margin-left: 20px;
  background-color: white;
  color: black;
`;
const EditBtn = styled.button`
  margin-left: 20px;
  background-color: black;
  color: white;
`;
