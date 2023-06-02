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
  const [sbProdview, setSbProdview] = useState([]);
  const [prodloading, setProdloading] = useState(false);
  const [category, setCategory] = useState(sbMember.tasteResult);
  const [tasteRes, setTasteRes] = useState("");
  const [radioOption, setRadioOption] = useState("주문이력없음");
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
  const handleRadio = (e) => {
    setRadioOption(e.target.value);
  };
  const filterRadioOption = (sbProdList) => {
    if (radioOption === "주문이력없음") {
      setSbProdview(
        sbProdList.filter((p) => p.sbProdMemberReviewDto.length === 0)
      );
    } else if (radioOption === "전체") {
      setSbProdview(sbProdList);
    } else if (radioOption === "주문이력있음") {
      setSbProdview(
        sbProdList.filter((p) => p.sbProdMemberReviewDto.length !== 0)
      );
    }
  };

  const star = [1, 2, 3, 4, 5];
  function addComma(num) {
    var regexp = /\B(?=(\d{3})+(?!\d))/g;
    return num.toString().replace(regexp, ",");
  }
  useEffect(() => {
    const fetchProducts = async () => {
      setProdloading(true);
      try {
        const res = await axios.get(
          `http://localhost:8080/subsProduct/adminSbMemberRecord?memberId=${
            sbMember.memberId
          }&scentNoteName=${escape(category)}`
        );
        const result = await axios.get(
          `http://localhost:8080/adminMemberTestResult?memberId=${sbMember.memberId}`
        );
        setSbProdList(res.data);
        setTasteRes(result.data);
        filterRadioOption(res.data);
      } catch (e) {
        console.log(e);
      }
      setProdloading(false);
    };
    fetchProducts();
    console.log(sbProdview);
  }, [category, radioOption]);

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
          <div className="radiobox">
            <label>
              <input
                type="radio"
                name="recordoption"
                value="주문이력없음"
                onChange={handleRadio}
                checked={radioOption === "주문이력없음"}
              />
              주문이력없음
            </label>
            <label>
              <input
                type="radio"
                name="recordoption"
                value="전체"
                onChange={handleRadio}
                checked={radioOption === "전체"}
              />
              전체
            </label>
            <label>
              <input
                type="radio"
                name="recordoption"
                value="주문이력있음"
                onChange={handleRadio}
                checked={radioOption === "주문이력있음"}
              />
              주문이력있음
            </label>
          </div>
        </OptionBox>
        {}
        <ProductContainer>
          <tr className="productTitle">
            <th>구독상품선택</th>
            <th>총 {sbProdview.length}건</th>
          </tr>
          <ProductItemList>
            {sbProdview.length === 0 ? (
              <div className="noResult">결과가 없습니다.</div>
            ) : (
              sbProdview.map((sbprod) => (
                <SbProdBox
                  className={nowSelect === sbprod ? "active" : ""}
                  onClick={() => {
                    nowSelect === sbprod
                      ? setNowSelect("")
                      : setNowSelect(sbprod);
                  }}
                >
                  <InlineContent>
                    <div>ID: {sbprod.sbProdNum}</div>
                    <div>{sbprod.scentNoteName} Note</div>
                  </InlineContent>
                  <ImgBox>
                    <img
                      src={`http://localhost:8080/images/${sbprod.sbProdImage}`}
                      alt="sbProdImage"
                    />
                  </ImgBox>
                  <BlockContent>{sbprod.scentName} 향</BlockContent>
                  <BlockContentS>{sbprod.sbProdIntro}</BlockContentS>
                  <InlineContent>
                    <div>{addComma(sbprod.sbProdPrice)}원</div>
                    <div>재고: {sbprod.sbProdStock}개</div>
                  </InlineContent>
                  {sbprod.sbProdMemberReviewDto.length !== 0 && (
                    <>
                      <RiviewBox>
                        <div className="reviewdate">
                          이전주문결제일:{" "}
                          {sbprod.sbProdMemberReviewDto[0].sbSendPayDate}
                        </div>
                      </RiviewBox>
                      {sbprod.sbProdMemberReviewDto[0].score ? (
                        <RiviewBox>
                          <div className="reviewscore">
                            {star.map((s) =>
                              s <= sbprod.sbProdMemberReviewDto[0].score ? (
                                <>✭</>
                              ) : (
                                <>☆</>
                              )
                            )}
                            &nbsp;&nbsp;
                          </div>
                          <div className="review">
                            {sbprod.sbProdMemberReviewDto[0].review}
                          </div>
                        </RiviewBox>
                      ) : (
                        <RiviewBox>리뷰 없음</RiviewBox>
                      )}
                    </>
                  )}
                  <Buttonbox>
                    {nowSelect === sbprod ? (
                      <button
                        className="cancelbtn"
                        onClick={() => setNowSelect("")}
                      >
                        선택취소
                      </button>
                    ) : (
                      <button
                        className="btn"
                        onClick={() => setNowSelect(sbprod)}
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
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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
  margin-top: 10px;
  select {
    width: 40%;
    height: 40px;
    margin: 0 auto;
    font-size: 1.1rem;
    font-weight: 500;
  }
  .radiobox {
    margin: 10px auto;
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
    font-weight: 600;
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
  cursor: pointer;
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
const RiviewBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  .reviewdate {
    line-height: 1.5;
    font-size: 0.9rem;
    font-weight: 500;
    color: red;
  }
  .reviewscore {
    margin-left: 10px;
    line-height: 1.5;
    font-size: 1rem;
    font-weight: 600;
  }
  .review {
    margin-left: 10px;
    line-height: 1.5;
    font-size: 1rem;
    font-weight: 500;
  }
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
