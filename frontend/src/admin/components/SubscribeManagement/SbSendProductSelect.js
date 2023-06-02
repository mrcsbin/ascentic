import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const SbSendProductSelect = ({
  sbMember,
  sbProduct,
  handleSbProduct,
  hadleCloseSelectModal,
}) => {
  const [nowSelect, setNowSelect] = useState(sbProduct);
  const [sbProdList, setSbProdList] = useState([]);
  const [prodloading, setProdloading] = useState(false);
  const [category, setCategory] = useState(sbMember.tasteResult);
  const [tasteRes, setTasteRes] = useState("");
  const Categories = [
    {
      name: "전체보기",
      text: "all",
    },
    {
      name: "Animal",
      text: "Animal",
    },
    {
      name: "Watery&Powdery",
      text: "Watery&Powdery",
    },
    {
      name: "Woody",
      text: "Woody",
    },
    {
      name: "Mossy",
      text: "Mossy",
    },
    {
      name: "Herbal&Green",
      text: "Herbal&Green",
    },
    {
      name: "Floral",
      text: "Floral",
    },
    {
      name: "Citrus",
      text: "Citrus",
    },
    {
      name: "Fruity",
      text: "Fruity",
    },
    {
      name: "Special",
      text: "Special",
    },
  ];
  const handleCategory = (e) => {
    setCategory(e.target.value);
  };

  function addComma(num) {
    var regexp = /\B(?=(\d{3})+(?!\d))/g;
    return num.toString().replace(regexp, ",");
  }
  useEffect(() => {
    const fetchProducts = async () => {
      setProdloading(true);
      try {
        const res = await axios.get(
          `http://localhost:8080/adminSbMemberRecord?memberId=${sbMember.memberId}&scentNoteName=${category}`
        );
        const result = await axios.get(
          `http://localhost:8080/adminMemberTestResult?memberId=${sbMember.memberId}`
        );
        setSbProdList(res.data);
        setTasteRes(result.data);
        console.log(res.data);
        console.log(result.data);
      } catch (e) {
        console.log(e);
      }
      setProdloading(false);
    };
    fetchProducts();
  }, [category]);

  // 대기 중일 때
  if (prodloading) {
    // return <Loading isLoading={loading} />;
  }
  // 아직 값이 설정되지 않았을 때
  if (!sbProdList) {
    return null;
  }
  return (
    <>
      <ModalBackground onClick={() => hadleCloseSelectModal()} />
      <ModalContainer>
        <button className="close" onClick={() => hadleCloseSelectModal()}>
          &times;
        </button>
        <TasteResBox>
          <div>{sbMember.memberId}님의 구독취향</div>
          <div>{sbMember.tasteResult}</div>
          <div>
            {tasteRes !== "" && (
              <div>
                1위 {tasteRes.firstPlace}&nbsp; | &nbsp;2위{" "}
                {tasteRes.secondPlace}&nbsp; | &nbsp;3위 {tasteRes.thirdPlace}
              </div>
            )}
          </div>
        </TasteResBox>
        <OptionBox>
          <select
            name="category"
            defaultValue={sbMember.tasteResult}
            onChange={handleCategory}
          >
            {Categories.map((c) => (
              <option value={c.text}>{c.name}</option>
            ))}
          </select>
        </OptionBox>
        <ProductContainer>
          <tr className="productTitle">
            <th>구독상품선택</th>
            <th>총 {sbProdList.length}건</th>
          </tr>
          <ProductItemList>
            {sbProdList.length === 0 ? (
              <div className="noResult">결과가 없습니다.</div>
            ) : (
              sbProdList.map((sbproduct) => (
                <SbProdBox
                  className={nowSelect === sbproduct ? "active" : ""}
                  onClick={() => setNowSelect(sbproduct)}
                >
                  <InlineContent>
                    <div>ID: {sbproduct.sbProdNum}</div>
                    <div>{sbproduct.scentNoteName} Note</div>
                  </InlineContent>
                  <ImgBox>
                    <img
                      src={`/images/${sbproduct.sbProdImage}`}
                      alt="sbProdImage"
                    />
                  </ImgBox>
                  <BlockContent>{sbproduct.scentName} 향</BlockContent>
                  <BlockContentS>{sbproduct.sbProdIntro}</BlockContentS>
                  <InlineContent>
                    <div>{addComma(sbproduct.sbProdPrice)}원</div>
                    <div>재고: {sbproduct.sbProdStock}개</div>
                  </InlineContent>
                  <Buttonbox>
                    {nowSelect === sbproduct ? (
                      <button
                        className="cancelbtn"
                        onClick={() => setNowSelect("")}
                      >
                        선택취소
                      </button>
                    ) : (
                      <button
                        className="btn"
                        onClick={() => setNowSelect(sbproduct)}
                      >
                        선택
                      </button>
                    )}
                  </Buttonbox>
                </SbProdBox>
              ))
            )}
          </ProductItemList>
        </ProductContainer>
        <EditBtnContainer>
          <CloseBtn onClick={() => hadleCloseSelectModal()}>취소</CloseBtn>
          <EditBtn onClick={() => handleSbProduct(nowSelect)}>상품등록</EditBtn>
        </EditBtnContainer>
      </ModalContainer>
    </>
  );
};

const ModalBackground = styled.div`
  position: fixed;
  top: -2%;
  left: -44%;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1100;
`;
const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 550px;
  height: 800px;
  background-color: white;
  z-index: 1100;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 50px;
  .close {
    position: absolute;
    top: 2%;
    right: 6%;
    padding: 0;
    font-size: 2rem;
    background-color: white;
    border: 0;
    cursor: pointer;
  }
`;

const OptionBox = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 20px;
  select {
    width: 40%;
    height: 40px;
    margin: 0 auto;
    font-size: 1.1rem;
    font-weight: 500;
  }
`;
const TasteResBox = styled.div`
  width: 100%;
  text-align: center;
  > div:nth-child(1) {
    font-size: 1rem;
    line-height: 1.5;
    font-weight: 400;
  }
  > div:nth-child(2) {
    font-size: 1.2rem;
    line-height: 2;
    font-weight: 500;
  }
  > div {
    font-size: 1rem;
    line-height: 1.6;
    font-weight: 500;
  }
`;
const ProductContainer = styled.table`
  width: 100%;
  display: flex;
  flex-direction: column;
  .productTitle {
    width: 100%;
    height: 50px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-bottom: 1.5px solid black;
  }
  .productTitle > th:nth-child(1) {
    text-align: left;
    padding-top: 20px;
    padding-left: 10px;
    font-size: 1.3rem;
    font-weight: 600;
    background-color: white;
  }
  .productTitle > th:nth-child(2) {
    padding-top: 25px;
    padding-right: 10px;
    font-size: 1rem;
    font-weight: 500;
  }
`;
const ProductItemList = styled.div`
  width: 100%;
  height: 500px;
  display: flex;
  overflow-x: hidden;
  overflow-y: scroll;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 1px solid gray;
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-thumb {
    outline: none;
    border-radius: 10px;
    background-color: #f3f1f1;
  }
  ::-webkit-scrollbar-track {
    box-shadow: none;
    background-color: transparent;
  }
  .active {
    background-color: rgba(245, 245, 245, 1);
  }
  .noResult {
    margin-top: 100px;
  }
`;
const SbProdBox = styled.div`
  margin: 0;
  padding: 10px;
  width: 500px;
  border-bottom: 1px solid black;
`;
const InlineContent = styled.div`
  div {
    display: inline-block;
    margin: 5px 15px 10px 0;
  }
`;
const ImgBox = styled.div`
  display: block;
  float: left;
  margin-right: 15px;
  width: 90px;
  height: 90px;
  overflow: hidden;
  img {
    width: 90px;
    height: 90px;
    object-fit: cover;
    object-position: center;
  }
`;
const BlockContent = styled.div`
  margin-bottom: 10px;
  font-weight: 500;
`;
const BlockContentS = styled.div`
  margin-bottom: 5px;
  font-size: 0.9rem;
  line-height: 1.2;
  word-break: keep-all;
`;
const Buttonbox = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  button {
    margin-right: 10px;
    padding: 5px 15px;
    border: 1px solid black;
    cursor: pointer;
  }
  .cancelbtn {
    background-color: white;
    color: black;
  }
  .btn {
    background-color: black;
    color: white;
  }
`;

const EditBtnContainer = styled.div`
  width: 100%;
  height: 5%;
  margin-top: 30px;
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
const EditBtn = styled.button`
  margin-left: 20px;
  background-color: black;
  color: white;
`;
const CloseBtn = styled.button`
  background-color: white;
  color: black;
`;

export default SbSendProductSelect;
