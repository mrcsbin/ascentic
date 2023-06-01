import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const OrderEditModal = ({ order, hadleCloseEditModal }) => {
  const [orderInfo, setOrderInfo] = useState({
    orderState: order.orderState,
    shipName: order.shipName,
    shipTel: order.shipTel,
    shipMainAddress: order.shipMainAddress,
    shipSubAddress: order.shipSubAddress,
    shipMessage: order.shipMessage,
    shipCode: order.shipCode,
  });

  const PriceArr = [];
  order.orderProdDtoList.map((p) => {
    return PriceArr.push(p.prodPrice * p.prodCount);
  });
  const TotalPrice = PriceArr.reduce((a, b) => a + b, 0);
  function addComma(num) {
    var regexp = /\B(?=(\d{3})+(?!\d))/g;
    return num.toString().replace(regexp, ",");
  }
  //input 입력시
  const handleChange = (e) => {
    setOrderInfo({
      ...orderInfo,
      [e.target.name]: e.target.value,
    });
  };
  console.log(orderInfo);

  //주문 취소 버튼 클릭시
  const hadleCancel = (orderNum) => {
    if (window.confirm("주문을 취소하시겠습니까?")) {
      setOrderInfo({
        ...orderInfo,
        orderState: "주문취소",
      });
    } else {
      alert("취소했습니다.");
    }
  };

  // 수정 버튼 클릭시
  const handleEdit = () => {
    // 상품 정보 검사
    const isEmptyInfo = [
      orderInfo.shipName,
      orderInfo.shipTel,
      orderInfo.shipMainAddress,
      orderInfo.shipSubAddress,
      orderInfo.shipMessage,
      orderInfo.shipCode,
    ].some((value) => value === "");

    if (isEmptyInfo) {
      alert("주문 정보를 입력해주세요");
      return;
    }

    const updateProduct = async () => {
      try {
        await axios.post(`http://localhost:8080/`, orderInfo);
        alert("주문 정보가 수정되었습니다!");
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
        <OrderShipmentContainer>
          <tr>
            <TitleTh colSpan={2}>주문정보</TitleTh>
            <TitleTh colSpan={2}>배송정보</TitleTh>
          </tr>
          <tr>
            <th className="tablehead">주문번호</th>
            <td>{order.orderId}</td>
            <th className="tablehead">수령인</th>
            <td>
              <input
                type="text"
                name="shipName"
                value={order.shipName}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <th className="tablehead">주문일자</th>
            <td>{order.orderDate}</td>
            <th className="tablehead">배송연락처</th>
            <td>
              <input
                type="text"
                name="shipTel"
                value={order.shipTel}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <th className="tablehead">주문상태</th>
            <td>
              {order.orderState === "주문취소" ? (
                order.orderState
              ) : (
                <select
                  name="orderState"
                  defaultValue={order.orderState}
                  onChange={handleChange}
                >
                  <option value="결제완료">결제완료</option>
                  <option value="배송준비중">배송준비중</option>
                  <option value="배송중">배송중</option>
                  <option value="배송완료">배송완료</option>
                </select>
              )}
            </td>
            <th className="tablehead rowspan2" rowSpan={2}>
              배송주소
            </th>
            <td className="rowspan2" rowSpan={2}>
              <textarea
                style={{ resize: "none" }}
                name="shipMainAddress"
                value={order.shipMainAddress}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <th className="tablehead">구매아이디</th>
            <td>{order.memberId}</td>
          </tr>
          <tr>
            <th className="tablehead">구매자</th>
            <td>{order.orderName}</td>
            <th className="tablehead">배송 상세주소</th>
            <td>
              <input
                type="text"
                name="shipSubAddress"
                value={order.shipSubAddress}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <th className="tablehead">구매연락처</th>
            <td>{order.orderTel}</td>
            <th className="tablehead">배송메시지</th>
            <td>
              <input
                type="text"
                name="shipMessage"
                value={order.shipMessage}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <th className="tablehead">구매이메일</th>
            <td>{order.orderEmail}</td>
            <th className="tablehead">송장번호</th>
            <td>
              <input
                type="text"
                name="shipCode"
                value={order.shipCode}
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
            <th className="tablehead">주문금액 합계</th>
            <td>{addComma(TotalPrice)}원</td>
            <th className="tablehead">배송비</th>
            <td>{addComma(order.shipCharge)}원</td>
          </tr>
          <tr>
            <th className="tablehead">결제방식</th>
            <td>{order.orderPayment}</td>
            <th className="tablehead">결제정보</th>
            <td>{order.orderPaymentInfo}</td>
          </tr>
        </OrderShipmentContainer>
        <ProductContainer>
          <tr className="productTitle">
            <th colSpan={5}>상품정보</th>
            <th>총 {order.orderProdDtoList.length}건</th>
          </tr>
          <tr>
            <th>번호</th>
            <th>이미지</th>
            <th>상품명</th>
            <th>옵션명</th>
            <th>수량</th>
            <th>가격</th>
          </tr>
          <ProductItemList>
            {order.orderProdDtoList.map((orderProd) => (
              <ProductItem>
                <td>{orderProd.productNum}</td>
                <td>
                  <div>
                    <img
                      src={`http://localhost:8080/images/${orderProd.prodImgName}`}
                      alt=""
                    />
                  </div>
                </td>
                <td>{orderProd.prodName}</td>
                <td>{orderProd.optionName}</td>
                <td>{orderProd.prodCount}</td>
                <td>{addComma(orderProd.prodPrice)}원</td>
              </ProductItem>
            ))}
          </ProductItemList>
        </ProductContainer>
        <EditBtnContainer>
          {order.orderState === "결제완료" && (
            <CancelBtn
              className="cancelbtn"
              onClick={() => hadleCancel(order.orderId)}
            >
              주문취소
            </CancelBtn>
          )}
          <EditBtn onClick={() => handleEdit()}>수정</EditBtn>
          <CloseBtn onClick={() => hadleCloseEditModal()}>수정 취소</CloseBtn>
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
  height: 830px;
  background-color: white;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 80px;
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
  .rowspan2 {
    vertical-align: middle;
  }
  .rowspan2 > textarea {
    vertical-align: middle;
    height: 70px;
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
    width: 10%;
  }
  tr:nth-child(2) > th:nth-child(2) {
    width: 20%;
  }
  tr:nth-child(2) > th:nth-child(3) {
    width: 20%;
  }
  tr:nth-child(2) > th:nth-child(4) {
    width: 15%;
  }
  tr:nth-child(2) > th:nth-child(5) {
    width: 10%;
  }
  tr:nth-child(2) > th:nth-child(6) {
    width: 15%;
  }
`;
const ProductItemList = styled.div`
  width: 100%;
  display: flex;
  overflow-y: scroll;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const ProductItem = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: stretch;
  border-bottom: 1px solid gray;
  td {
    margin: 0 10px;
    text-align: center;
    line-height: 70px;
  }
  td:nth-child(1) {
    width: 10%;
  }
  td:nth-child(2) {
    width: 20%;
  }
  td:nth-child(2) > div {
    width: 60px;
    height: 60px;
    overflow: hidden;
    margin: 5px auto;
  }
  td:nth-child(2) > div > img {
    width: 60px;
    height: 60px;
    object-fit: cover;
    object-position: center;
  }
  td:nth-child(3) {
    width: 20%;
  }
  td:nth-child(4) {
    width: 15%;
  }
  td:nth-child(5) {
    width: 10%;
  }
  td:nth-child(6) {
    width: 15%;
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
const CancelBtn = styled.button`
  background-color: black;
  color: white;
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

export default OrderEditModal;
