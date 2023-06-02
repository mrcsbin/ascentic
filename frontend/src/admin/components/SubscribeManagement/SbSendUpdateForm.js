import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import SbSendProductSelect from "./SbSendProductSelect";

const SbSendUpdateForm = ({ sbSend, hadleCloseEditModal }) => {
  const [sbSendInfo, setSbSendInfo] = useState({
    sbSendNum: sbSend.sbSendNum,
    sbSendState: sbSend.sbSendState,
    sbSendPostcode: sbSend.sbSendPostcode,
    sbProdNum: sbSend.subscribeProduct.sbProdNum,
    sbShippingCode: sbSend.sbShippingCode,
  });
  const [sbProduct, setSbProduct] = useState(sbSend.subscribeProduct);
  const handleSbProduct = (prod) => {
    if (prod === "") {
      alert("상품을 선택해주세요.");
    } else {
      setSbProduct(prod);
      setSbSendInfo({
        ...sbSendInfo,
        sbProdNum: prod.sbProdNum,
      });
      setIsOpenSelectModal(false);
    }
  };

  const [isOpenSelectModal, setIsOpenSelectModal] = useState(false);
  const hadleOpenSelectModal = () => {
    setIsOpenSelectModal(true);
  };
  const hadleCloseSelectModal = () => {
    setIsOpenSelectModal(false);
  };

  function addComma(num) {
    var regexp = /\B(?=(\d{3})+(?!\d))/g;
    return num.toString().replace(regexp, ",");
  }
  //input 입력시
  const handleChange = (e) => {
    setSbSendInfo({
      ...sbSendInfo,
      [e.target.name]: e.target.value,
    });
  };
  console.log(sbSendInfo);

  // 수정 버튼 클릭시
  const handleEdit = () => {
    // 상품 정보 검사
    const isEmptyInfo = [
      sbSendInfo.sbSendNum,
      sbSendInfo.sbSendState,
      sbSendInfo.sbSendPostcode,
    ].some((value) => value === "");

    if (isEmptyInfo) {
      alert("정보를 입력해주세요");
      return;
    }

    const updateProduct = async () => {
      try {
        await axios.post("http://localhost:8080/updateOrderInfo", sbSendInfo);
        alert("구독 주문 정보가 수정되었습니다!");
        window.location.reload();
      } catch (e) {
        console.log(e);
      }
    };
    updateProduct();

    hadleCloseEditModal();
  };

  return (
    <>
      <ModalBackground onClick={() => hadleCloseEditModal()} />
      <ModalContainer>
        <button className="close" onClick={() => hadleCloseEditModal()}>
          &times;
        </button>
        <ScrollContainer>
          <OrderShipmentContainer>
            <tr>
              <TitleTh colSpan={2}>주문정보</TitleTh>
              <TitleTh colSpan={2}>배송정보</TitleTh>
            </tr>
            <tr>
              <th className="tablehead">구독주문번호</th>
              <td>{sbSend.sbSendNum}</td>
              <th className="tablehead">이름</th>
              <td>{sbSend.sbMember.sbMemberName}</td>
            </tr>
            <tr>
              <th className="tablehead">결제일자</th>
              <td>{sbSend.sbSendPayDate}</td>
              <th className="tablehead">연락처</th>
              <td>{sbSend.sbMember.sbMemberTel}</td>
            </tr>
            <tr>
              <th className="tablehead">구독주문상태</th>
              <td>
                <select
                  name="sbSendState"
                  defaultValue={sbSendInfo.sbSendState}
                  onChange={handleChange}
                >
                  <option value="결제완료">결제완료</option>
                  <option value="상품준비중">상품준비중</option>
                  <option value="배송준비중">배송준비중</option>
                  <option value="배송중">배송중</option>
                  <option value="배송완료">배송완료</option>
                </select>
              </td>
              <th className="tablehead rowspan3" rowSpan={3}>
                배송주소
              </th>
              <td className="rowspan3" rowSpan={3}>
                <textarea
                  style={{ resize: "none" }}
                  name="sbSendPostcode"
                  value={sbSendInfo.sbSendPostcode}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <th className="tablehead">구독회원번호</th>
              <td>{sbSend.sbMember.sbMemberNum}</td>
            </tr>
            <tr>
              <th className="tablehead">회원ID</th>
              <td>{sbSend.sbMember.memberId}</td>
            </tr>
            <tr>
              <th className="tablehead">구독기간</th>
              <td>
                {sbSend.sbMember.sbStartDate}~{sbSend.sbMember.sbEndDate}
              </td>
              <th className="tablehead">배송메시지</th>
              <td>{sbSend.sbMember.sbShipMessage}</td>
            </tr>
            <tr>
              <th className="tablehead">구독 취향 Note</th>
              <td>{sbSend.sbMember.tasteResult}</td>
              <th className="tablehead">송장번호</th>
              <td>
                <input
                  type="text"
                  name="sbShippingCode"
                  value={sbSendInfo.sbShippingCode}
                  onChange={handleChange}
                />
              </td>
            </tr>
          </OrderShipmentContainer>
          <OrderShipmentContainer>
            <tr>
              <TitleTh colSpan={4}>결제정보</TitleTh>
            </tr>

            <tr>
              <th className="tablehead">결제금액</th>
              <td>{addComma(sbSend.sbMember.sbPrice)}원</td>
              <th className="tablehead">결제방식</th>
              <td>{sbSend.sbSendPayment}</td>
            </tr>
          </OrderShipmentContainer>

          {sbProduct === "" ? (
            <ProductContainer>
              <tr className="productTitle">
                <th>구독상품정보</th>
              </tr>
              <tr>
                <button
                  className="changeSbProd"
                  onClick={() => hadleOpenSelectModal()}
                >
                  상품 등록하기
                </button>
              </tr>
            </ProductContainer>
          ) : (
            <ProductContainer>
              <tr className="productTitle">
                <th colSpan={5}>구독상품정보</th>
                <th>
                  <button onClick={() => hadleOpenSelectModal()}>
                    변경하기
                  </button>
                </th>
              </tr>
              <tr>
                <th>번호</th>
                <th>이미지</th>
                <th>향</th>
                <th>Note</th>
                <th>설명</th>
                <th>가격</th>
              </tr>
              <ProductItemList>
                <ProductItem>
                  <td>{sbProduct.sbProdNum}</td>
                  <td>
                    <div>
                      <img
                        src={`http://localhost:8080/images/${sbProduct.sbProdImage}`}
                        alt=""
                      />
                    </div>
                  </td>
                  <td>{sbProduct.scentName}</td>
                  <td>{sbProduct.scentNoteName}</td>
                  <td>{sbProduct.sbProdIntro}</td>
                  <td>{addComma(sbProduct.sbProdPrice)}원</td>
                </ProductItem>
              </ProductItemList>
            </ProductContainer>
          )}
          {sbSend.sbSendScore && (
            <ReviewContainer>
              <tr className="reviewTitle">
                <th colSpan={2}>리뷰</th>
              </tr>
              <tr>
                <th>점수</th>
                <th>의견</th>
              </tr>
              <tr>
                <td>{sbSend.sbSendScore}</td>
                <td>{sbSend.sbSendReview}</td>
              </tr>
            </ReviewContainer>
          )}
        </ScrollContainer>
        {isOpenSelectModal && (
          <SbSendProductSelect
            sbMember={sbSend.sbMember}
            sbProduct={sbProduct} //현재 선택되어있는 구독상품
            handleSbProduct={handleSbProduct}
            hadleCloseSelectModal={hadleCloseSelectModal}
          />
        )}
        <EditBtnContainer>
          <CloseBtn onClick={() => hadleCloseEditModal()}>수정 취소</CloseBtn>
          <EditBtn onClick={() => handleEdit()}>수정하기</EditBtn>
        </EditBtnContainer>
      </ModalContainer>
    </>
  );
};

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1000;
`;
const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 800px;
  height: 840px;
  background-color: white;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 80px;
  .close {
    position: absolute;
    top: 2%;
    right: 3%;
    padding: 0;
    font-size: 2rem;
    background-color: white;
    border: 0;
    cursor: pointer;
  }
`;
const ScrollContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-y: scroll;
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
`;

const TitleTh = styled.th`
  text-align: left;
  padding-top: 15px;
  padding-left: 10px;
  font-size: 1.3rem;
  font-weight: 600;
  background-color: white;
  border-bottom: 1.5px solid black;
`;
const OrderShipmentContainer = styled.table`
  width: 100%;
  tr {
    width: 100%;
    height: 45px;
  }
  .tablehead {
    width: 20%;
    text-align: left;
    padding-left: 20px;
    line-height: 45px;
    border-bottom: 1px solid gray;
    background-color: rgba(240, 240, 240, 1);
  }
  td {
    width: 30%;
    line-height: 1.5;
    padding: 0 20px;
    border-bottom: 1px solid gray;
    word-break: keep-all;
  }
  input {
    padding: 0 10px;
    height: 30px;
    font-size: 1rem;
  }
  select {
    padding: 0 10px;
    height: 30px;
    font-size: 1rem;
  }
  .rowspan3 {
    vertical-align: middle;
  }
  .rowspan3 > textarea {
    vertical-align: middle;
    height: 120px;
    font-size: 1rem;
    line-height: 1.5;
    padding: 0 10px;
  }
`;
const ProductContainer = styled.table`
  width: 100%;
  display: flex;
  flex-direction: column;
  .productTitle {
    width: 100%;
    height: 45px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    border-bottom: 1.5px solid black;
  }
  .productTitle > th:nth-child(1) {
    text-align: left;
    padding-bottom: 10px;
    padding-left: 10px;
    font-size: 1.3rem;
    font-weight: 600;
    background-color: white;
  }
  .productTitle > th:nth-child(2) > button {
    margin-bottom: 5px;
    padding: 5px 10px;
    font-size: 1rem;
    font-weight: 500;
    background-color: white;
    border: 1.5px solid black;
    cursor: pointer;
  }
  tr:nth-child(2) {
    width: 100%;
    height: 30px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: rgba(240, 240, 240, 1);
  }
  tr:nth-child(2) > th {
    margin: 0 10px;
  }
  tr:nth-child(2) > th:nth-child(1) {
    width: 8%;
  }
  tr:nth-child(2) > th:nth-child(2) {
    width: 15%;
  }
  tr:nth-child(2) > th:nth-child(3) {
    width: 15%;
  }
  tr:nth-child(2) > th:nth-child(4) {
    width: 15%;
  }
  tr:nth-child(2) > th:nth-child(5) {
    width: 30%;
  }
  tr:nth-child(2) > th:nth-child(6) {
    width: 15%;
  }
`;
const ProductItemList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .changeSbProd {
    font-size: 1.1rem;
    color: white;
    background-color: black;
    border: 0;
    padding: 10px 15px;
    margin: 10px auto 0 auto;
  }
`;
const ProductItem = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: stretch;
  border-bottom: 1px solid gray;
  td {
    margin: 0 10px;
    text-align: center;
  }
  td:nth-child(1) {
    width: 8%;
    line-height: 100px;
  }
  td:nth-child(2) {
    width: 15%;
    line-height: 100px;
  }
  td:nth-child(2) > div {
    width: 80px;
    height: 80px;
    overflow: hidden;
    margin: 10px auto;
  }
  td:nth-child(2) > div > img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    object-position: center;
  }
  td:nth-child(3) {
    width: 15%;
    line-height: 100px;
  }
  td:nth-child(4) {
    width: 15%;
    line-height: 100px;
  }
  td:nth-child(5) {
    width: 30%;
    display: flex;
    align-items: center;
    line-height: 1.2;
  }
  td:nth-child(6) {
    width: 15%;
    line-height: 100px;
  }
`;
const ReviewContainer = styled.table`
  width: 100%;
  display: flex;
  flex-direction: column;
  .reviewTitle {
    width: 100%;
    height: 45px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-end;
    border-bottom: 1.5px solid black;
  }
  .reviewTitle > th {
    padding-bottom: 10px;
    padding-left: 10px;
    font-size: 1.3rem;
    font-weight: 600;
  }
  tr:nth-child(2) {
    width: 100%;
    height: 30px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: rgba(240, 240, 240, 1);
  }
  tr:nth-child(2) > th {
    margin: 0 10px;
  }
  tr:nth-child(2) > th:nth-child(1) {
    width: 15%;
  }
  tr:nth-child(2) > th:nth-child(2) {
    width: 80%;
  }
  tr:nth-child(3) {
    display: flex;
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid gray;
  }
  td {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 0;
    line-height: 1.2;
    text-align: center;
    margin: 0 10px;
  }
  tr:nth-child(3) > td:nth-child(1) {
    width: 15%;
    font-size: 1.2rem;
    font-weight: 500;
  }
  tr:nth-child(3) > td:nth-child(2) {
    width: 80%;
  }
`;

const EditBtnContainer = styled.div`
  width: 100%;
  height: 5%;
  margin-top: 20px;
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
  margin-left: 20px;
  background-color: white;
  color: black;
`;

export default SbSendUpdateForm;
