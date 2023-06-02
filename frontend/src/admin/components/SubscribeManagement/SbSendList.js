import React, { useState } from "react";
import styled from "styled-components";
import SbSendUpdateForm from "./SbSendUpdateForm";

const SbSendList = ({ sbSends, currentPage, setCurrentPage }) => {
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [selectSendNum, setSelectSendNum] = useState(0);

  const hadleOpenEditModal = (sendNum) => {
    setIsOpenEditModal(true);
    setSelectSendNum(sendNum);
  };
  const hadleCloseEditModal = () => {
    setIsOpenEditModal(false);
  };

  const sendsPerPage = 10;

  // 페이지 수 계산
  const totalPages = Math.ceil(sbSends.length / sendsPerPage);

  // 페이지별로 보여줄 상품 데이터 선택
  const indexOfLastSend = currentPage * sendsPerPage;
  const indexOfFirstSend = indexOfLastSend - sendsPerPage;
  const currentSbSends = sbSends.slice(indexOfFirstSend, indexOfLastSend);

  // 페이지 변경 함수
  const handlePageChange = (pageNumber) => {
    setCurrentPage(Number(pageNumber));
  };

  const SbSendBox = ({ sbSend, index, hadleOpenEditModal }) => {
    function addComma(num) {
      var regexp = /\B(?=(\d{3})+(?!\d))/g;
      return num.toString().replace(regexp, ",");
    }
    return (
      <SendItem>
        <SendNum onClick={() => hadleOpenEditModal(sbSend.sbSendNum)}>
          {sbSend.sbSendNum}
        </SendNum>
        <SendDate>{sbSend.sbSendPayDate}</SendDate>
        <SendName>{sbSend.sbMember.sbMemberName}</SendName>
        <SendProd>
          {sbSend.subscribeProduct === ""
            ? ""
            : sbSend.subscribeProduct.scentName}
        </SendProd>
        <SendPrice>{addComma(sbSend.sbMember.sbPrice)}원</SendPrice>
        <SendPay>{sbSend.sbSendPayment}</SendPay>
        <SendShipment>{sbSend.sbShippingCode}</SendShipment>
        <SendStatus>{sbSend.sbSendState}</SendStatus>
        <EditBtn>
          <button onClick={() => hadleOpenEditModal(sbSend.sbSendNum)}>
            수정
          </button>
        </EditBtn>
      </SendItem>
    );
  };

  return (
    <div>
      {sbSends.length === 0 ? (
        <SbSendLoading>로딩중입니다.</SbSendLoading>
      ) : (
        currentSbSends.map((sbSend, index) => (
          <SbSendBox
            sbSend={sbSend}
            index={index}
            hadleOpenEditModal={hadleOpenEditModal}
          />
        ))
      )}
      {isOpenEditModal && (
        <SbSendUpdateForm
          sbSend={sbSends.find((sbSend) => sbSend.sbSendNum === selectSendNum)}
          hadleCloseEditModal={hadleCloseEditModal}
        />
      )}
      <Pagination>
        {currentPage - 3 <= 0 ? (
          ""
        ) : (
          <PageBtn onClick={() => handlePageChange(currentPage - 1)}>
            이전
          </PageBtn>
        )}
        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter(
            (pageNumber) =>
              pageNumber > currentPage - 3 && pageNumber < currentPage + 3
          )
          .map((pageNumber) => (
            <PageNumBtn
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              style={{
                pointerEvents: pageNumber === currentPage ? "none" : "auto",
                borderColor: pageNumber === currentPage ? "black" : "white",
              }}
            >
              {pageNumber}
            </PageNumBtn>
          ))}
        {currentPage + 3 > totalPages ? (
          ""
        ) : (
          <PageBtn onClick={() => handlePageChange(currentPage + 1)}>
            다음
          </PageBtn>
        )}
      </Pagination>
    </div>
  );
};
const SbSendLoading = styled.div`
  width: 100%;
  margin-top: 40px;
  font-size: 1.5rem;
  text-align: center;
`;
const SendItem = styled.div`
  height: 60px;
  font-size: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-bottom: 1px solid gray;
  div {
    margin: 0 10px;
    font-weight: 400;
  }
`;
const SendNum = styled.div`
  width: 10%;
  text-decoration: underline;
  cursor: pointer;
`;
const SendDate = styled.div`
  width: 15%;
`;
const SendName = styled.div`
  width: 10%;
`;
const SendProd = styled.div`
  width: 10%;
`;
const SendPrice = styled.div`
  width: 10%;
`;
const SendPay = styled.div`
  width: 10%;
`;
const SendShipment = styled.div`
  width: 10%;
`;
const SendStatus = styled.div`
  width: 10%;
`;
const EditBtn = styled.div`
  width: 10%;
  button {
    font-size: 1rem;
    font-weight: 500;
    border: 1px solid black;
    padding: 5px 15px;
    cursor: pointer;
    background-color: black;
    color: white;
  }
`;
const Pagination = styled.div`
  display: inline-block;
  width: 100%;
  height: 30px;
  margin: 20px auto;
  text-align: center;
  align-items: center;
`;
const PageBtn = styled.div`
  display: inline-block;
  cursor: pointer;
  margin: 5px;
  padding: 2px;
  font-family: "Pretendard";
  font-size: 0.85rem;
  border: 1px solid;
  width: 2rem;
  &:hover {
    border-color: black;
  }
`;
const PageNumBtn = styled.div`
  display: inline-block;
  cursor: pointer;
  margin: 5px;
  padding: 2px;
  font-family: "Pretendard";
  font-size: 0.85rem;
  border: 1px solid;
  width: 1rem;
  &:hover {
    border-color: black;
  }
`;

export default SbSendList;
