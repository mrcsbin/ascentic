import React from "react";
import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import { categories, scentNames } from "./ProdSelectData";

const ProdAdd = () => {
  const [productInfo, setProductInfo] = useState({
    prodName: "",
    scentName: "Ambergris",
    prodCategory: "향수",
    prodInfo: "",
    options: [],
  });

  // 옵션 추가 버튼 클릭 시 실행
  const handleAddOption = () => {
    if (productInfo.options.length > 3) {
      alert("옵션이 너무 많습니다.");
      return;
    }
    setProductInfo((prevProductInfo) => ({
      ...prevProductInfo,
      options: [
        ...prevProductInfo.options,
        { prodOption: "", prodPrice: "", prodStock: "" },
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

  const [thumbnaililFile, setThumbnaililFile] = useState();
  const [imageFiles, setImageFiles] = useState([]);

  // 추가 버튼 클릭시
  const handleProdAdd = () => {
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

    // 대표사진 검사
    if (thumbnaililFile === undefined) {
      alert("상품 대표사진을 첨부해주세요!");
      return;
    }

    // 상품 이미지 검사
    if (imageFiles.length === 0) {
      alert("상품 이미지를 첨부해주세요!");
      return;
    }

    const updateProduct = async () => {
      try {
        const res = await axios.post(
          `http://localhost:8080/adminProdUpdate`,
          productInfo
        );

        const imagesFormData = new FormData();
        imagesFormData.append("prodNum", res.data);
        imagesFormData.append("thumbnail", thumbnaililFile);
        imageFiles.forEach((imageFile, index) => {
          imagesFormData.append("imageFiles", imageFile);
        });
        const uploadImages = async () => {
          try {
            await axios.post(
              `http://localhost:8080/uploadProdImages`,
              imagesFormData
            );
          } catch (e) {
            console.log(e);
            alert("상품이미지 업로드 오류");
          }
        };
        uploadImages();
        alert("상품이 추가되었습니다.");
        window.location.reload();
      } catch (e) {
        console.log(e);
        alert("상품 추가 오류");
      }
    };
    updateProduct();
  };

  return (
    <>
      <HeaderWrap>
        <HeaderLeft>상품 추가</HeaderLeft>
        <HeaderRight></HeaderRight>
      </HeaderWrap>
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
          <ThumbnailContainer>
            <Label>대표사진</Label>
            <ThumInput
              type="file"
              onChange={(e) => setThumbnaililFile(e.target.files[0])}
            ></ThumInput>
          </ThumbnailContainer>
          <Imagesontainer>
            <Label>이미지</Label>
            <ImageInput
              type="file"
              multiple
              onChange={(e) => setImageFiles(Array.from(e.target.files))}
            ></ImageInput>
          </Imagesontainer>
        </ProdInputContainer>
        <OptionContainer>
          <OneInputContainer>
            <OptionLabel>
              <OptionInfoLabel>옵션명</OptionInfoLabel>
              <OptionInfoLabel>가격</OptionInfoLabel>
              <OptionInfoLabel>재고</OptionInfoLabel>
            </OptionLabel>
          </OneInputContainer>
          {productInfo.options.map((option, index) => (
            <div key={index}>
              <OptionOneInputContainer>
                <Label>옵션{index + 1}</Label>
                <InputOption
                  type="text"
                  value={option.prodOption}
                  onChange={(e) => handleOptionChange(e, index, "prodOption")}
                />
                <InputOption
                  type="text"
                  value={option.prodPrice}
                  onChange={(e) => handleOptionChange(e, index, "prodPrice")}
                />
                원
                <InputOption
                  type="text"
                  value={option.prodStock}
                  onChange={(e) => handleOptionChange(e, index, "prodStock")}
                />
                개
                <OptionDelBtn onClick={() => handleDeleteOption(index)}>
                  -
                </OptionDelBtn>
              </OptionOneInputContainer>
            </div>
          ))}
          <OptionAddBtn onClick={() => handleAddOption()}>+</OptionAddBtn>
        </OptionContainer>
        <EditBtnContainer>
          <AddBtn onClick={() => handleProdAdd()}>상품 추가</AddBtn>
        </EditBtnContainer>
      </InputContainer>
    </>
  );
};

export default ProdAdd;

const HeaderWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin: 0 auto;
  padding-top: 50px;
  border-bottom: 2px solid black;
`;

const HeaderLeft = styled.div`
  padding: 20px 0;
  font-size: 30px;
  font-weight: 700;
`;

const HeaderRight = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: end;
`;

const InputContainer = styled.div`
  width: 80%;
  height: 90%;
`;

const ProdInputContainer = styled.div`
  width: 100%;
  height: 50%;
`;

const OptionContainer = styled.div`
  width: 100%;
  height: 45%;
`;

const EditBtnContainer = styled.div`
  width: 100%;
  height: 5%;
`;

const OneInputContainer = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  margin-bottom: 10px;
`;

const Label = styled.div`
  width: 15%;
  font-size: 20px;
  font-weight: 600;
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
  margin-bottom: 10px;
  align-items: center;

  > input:nth-child(3),
  input:nth-child(4) {
    margin-left: 60px;
  }
`;

const OptionLabel = styled.div`
  font-size: 20px;
  width: 80%;
  display: flex;
  margin-left: 15%;
`;

const OptionInfoLabel = styled.div`
  width: 33.3%;
`;

const InputOption = styled.input`
  width: 100px;
  height: 30px;
  gap: 10px;
  border: 1px solid;
`;

const OptionDelBtn = styled.button`
  margin-left: 10px;
  font-size: 20px;
  background-color: white;
  color: red;
  border: 1px solid red;
  border-radius: 50%;
  cursor: pointer;
  text-align: center;
`;

const OptionAddBtn = styled.button`
  cursor: pointer;
  font-size: 25px;
  margin-left: 45%;
  border: 1px solid gray;
  border-radius: 50%;
  background-color: white;
  text-align: center;
`;

const ThumbnailContainer = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  margin-bottom: 10px;
`;
const ThumInput = styled.input``;
const Imagesontainer = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  margin-bottom: 10px;
`;
const ImageInput = styled.input``;

const AddBtn = styled.button`
  width: 150px;
  height: 30px;
  margin-left: 50%;
  background-color: black;
  color: white;
  cursor: pointer;
`;

const CloseBtn = styled.button`
  margin-left: 20px;
  width: 150px;
  height: 30px;
  background-color: white;
  cursor: pointer;
`;
