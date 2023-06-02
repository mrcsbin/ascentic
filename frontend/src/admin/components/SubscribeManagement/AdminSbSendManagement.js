import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import SbSendList from "./SbSendList";

const SbSendManagement = () => {
  const [sbSends, setSbSends] = useState([
    {
      sbSendNum: 1,
      sbMember: {
        sbMemberNum: 1,
        memberId: "sungbin",
        sbStartDate: "2023-05-01",
        sbEndDate: null,
        sbMemberName: "조성빈",
        sbMemberTel: "01000000000",
        sbShipMessage: "문 앞에 두어주세요",
        sbPrice: 10000,
        tasteResult: "Woody",
      },
      subscribeProduct: {
        sbProdNum: 2,
        scentName: "Castoreum",
        scentNoteName: "Animal",
        sbProdPrice: 22900,
        sbProdIntro:
          "향초, 섬유향수, 샴푸 세가지 상품으로 구성된 캐스토리움향의 패키지입니다. 에이센틱과 함께 일상을 향기로 채워보세요.",
        sbProdImage: "expProduct2.webp",
      },
      sbSendPostcode: "경기 성남시 분당구 판교역로10번길 3",
      sbSendScore: 4,
      sbSendReview: "향이 너무 좋습니다!!!",
      sbSendPayDate: "2023-05-05",
      sbSendPayment: "naver",
      sbShippingCode: null,
      sbSendState: "결제완료",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("all");
  const [sortOption, setSortOption] = useState("early");

  const handleSort = () => {
    if (sortOption === "early") {
      sbSends.sort((a, b) => {
        return new Date(b.sbSendPayDate) - new Date(a.sbSendPayDate);
      });
    } else if (sortOption === "old") {
      sbSends.sort((a, b) => {
        return new Date(a.sbSendPayDate) - new Date(b.sbSendPayDate);
      });
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `http://localhost:8080/adminGetSbSend?sbSendState=${category}`
        );
        setSbSends(res.data);
        console.log(res.data);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    fetchData();
    setCurrentPage(1);
  }, [category, sortOption]);

  // 대기 중일 때
  if (loading) {
    // return <Loading isLoading={loading} />;
  }
  // 아직 값이 설정되지 않았을 때
  if (!sbSends) {
    return null;
  }
  return (
    <div>
      <HeaderWrap>
        <HeaderLeft>구독 주문 관리</HeaderLeft>
      </HeaderWrap>
      <InputContainer>
        <SendCategoryBox>
          <button
            className={category === "all" ? "activeCateBtn" : "cateBtn"}
            onClick={() => setCategory("all")}
          >
            전체보기
          </button>
          <button
            className={category === "결제완료" ? "activeCateBtn" : "cateBtn"}
            onClick={() => setCategory("결제완료")}
          >
            결제완료
          </button>
          <button
            className={category === "상품준비중" ? "activeCateBtn" : "cateBtn"}
            onClick={() => setCategory("상품준비중")}
          >
            상품준비중
          </button>
          <button
            className={category === "배송준비중" ? "activeCateBtn" : "cateBtn"}
            onClick={() => setCategory("배송준비중")}
          >
            배송준비중
          </button>
          <button
            className={category === "배송중" ? "activeCateBtn" : "cateBtn"}
            onClick={() => setCategory("배송중")}
          >
            배송중
          </button>
          <button
            className={category === "배송완료" ? "activeCateBtn" : "cateBtn"}
            onClick={() => setCategory("배송완료")}
          >
            배송완료
          </button>
          {/* <button
            className={category === "결제대기중" ? "activeCateBtn" : "cateBtn"}
            onClick={() => setCategory("결제대기중")}
          >
            결제대기중
          </button>
          <button
            className={category === "주문취소" ? "activeCateBtn" : "cateBtn"}
            onClick={() => setCategory("주문취소")}
          >
            주문취소
          </button> */}
        </SendCategoryBox>
        <SortOptionBox>
          <button
            className={sortOption === "early" ? "active" : ""}
            onClick={() => setSortOption("early")}
          >
            최근순
          </button>
          <button
            className={sortOption === "old" ? "active" : ""}
            onClick={() => setSortOption("old")}
          >
            오래된순
          </button>
        </SortOptionBox>
        <ListWrapper>
          <ListBox>
            <ContentTitle>
              <NumTitle>구독주문번호</NumTitle>
              <DateTitle>결제일</DateTitle>
              <NameTitle>구독회원</NameTitle>
              <ProdTitle>구독상품</ProdTitle>
              <PriceTitle>금액</PriceTitle>
              <PayTitle>결제정보</PayTitle>
              <ShipmentTitle>송장번호</ShipmentTitle>
              <StatusTitle>구독주문상태</StatusTitle>
              <EditTitle>수정</EditTitle>
            </ContentTitle>
          </ListBox>
          {handleSort()}
          <SbSendList
            sbSends={sbSends}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </ListWrapper>
      </InputContainer>
    </div>
  );
};

const HeaderWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin: 0 auto;
  padding-top: 30px;
  border-bottom: 2px solid black;
`;

const HeaderLeft = styled.div`
  padding: 20px 0;
  font-size: 30px;
  font-weight: 600;
`;
const InputContainer = styled.div`
  width: 90%;
  height: 90%;
  margin: 0 auto;
`;
const SendCategoryBox = styled.div`
  padding: 0 auto;
  margin-top: 10px;
  width: 100%;
  display: flex;
  justify-content: center;
  button {
    margin: 10px;
    padding: 10px;
    font-size: 1.3rem;
    background-color: white;
    border: 0;
    cursor: pointer;
  }
  .activeCateBtn,
  .cateBtn:hover {
    font-weight: 600;
    border-bottom: 2px solid black;
  }
`;
const SortOptionBox = styled.div`
  width: 95%;
  display: flex;
  justify-content: flex-end;
  padding: 0;
  button {
    background-color: white;
    border: 0;
    font-size: 1rem;
    font-weight: 400;
    margin: 0 5px 20px 5px;
    cursor: pointer;
  }
  .active {
    font-weight: 600;
    cursor: default;
  }
`;
const ListWrapper = styled.div`
  margin: 0 auto;
  width: 90%;
`;
const ListBox = styled.div`
  margin-top: 0;
  border-top: 1px solid gray;
  border-bottom: 1px solid gray;
  background-color: rgba(250, 250, 250, 1);
`;
const ContentTitle = styled.div`
  height: 40px;
  font-size: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;
  div {
    margin: 0 10px;
    font-weight: 600;
    color: rgba(100, 100, 100, 1);
  }
`;
const NumTitle = styled.div`
  width: 10%;
`;
const DateTitle = styled.div`
  width: 15%;
`;
const NameTitle = styled.div`
  width: 10%;
`;
const ProdTitle = styled.div`
  width: 10%;
`;
const PriceTitle = styled.div`
  width: 10%;
`;
const PayTitle = styled.div`
  width: 10%;
`;
const ShipmentTitle = styled.div`
  width: 10%;
`;
const StatusTitle = styled.div`
  width: 10%;
`;
const EditTitle = styled.div`
  width: 10%;
`;
export default SbSendManagement;
