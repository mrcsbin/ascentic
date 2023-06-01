import React, { useState } from "react";
import styled from "styled-components";
import OrderEditModal from "./OrderEditModal";

const OrderList = ({ orders, currentPage, setCurrentPage }) => {
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [selectOrderNum, setSelectOrderNum] = useState(0);

  const hadleOpenEditModal = (orderNum) => {
    setIsOpenEditModal(true);
    setSelectOrderNum(orderNum);
  };
  const hadleCloseEditModal = () => {
    setIsOpenEditModal(false);
  };

  const ordersPerPage = 10;

  // 페이지 수 계산
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  // 페이지별로 보여줄 상품 데이터 선택
  const indexOfLastProduct = currentPage * ordersPerPage;
  const indexOfFirstProduct = indexOfLastProduct - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstProduct, indexOfLastProduct);

  // 페이지 변경 함수
  const handlePageChange = (pageNumber) => {
    setCurrentPage(Number(pageNumber));
  };

  const OrderBox = ({ order, index, hadleOpenEditModal }) => {
    function addComma(num) {
      var regexp = /\B(?=(\d{3})+(?!\d))/g;
      return num.toString().replace(regexp, ",");
    }
    const PriceArr = [];
    order.orderProdDtoList.map((p) => {
      return PriceArr.push(p.prodPrice * p.prodCount);
    });
    const TotalPrice = PriceArr.reduce((a, b) => a + b, 0);
    return (
      <OrderItem>
        <OrderNum onClick={() => hadleOpenEditModal(order.orderId)}>
          {order.orderId}
        </OrderNum>
        <OrderDate>{order.orderDate}</OrderDate>
        <OrderName>{order.orderName}</OrderName>
        <OrderProd>
          {order.orderProdDtoList.length === 1 ? (
            order.orderProdDtoList[0].prodName
          ) : (
            <>
              {order.orderProdDtoList[0].prodName} 외&nbsp;
              {order.orderProdDtoList.length - 1}건
            </>
          )}
        </OrderProd>
        <OrderPrice>{addComma(TotalPrice)}원</OrderPrice>
        <OrderPay>{order.orderPayment}</OrderPay>
        <OrderShipment>{order.shipCode}</OrderShipment>
        <OrderStatus>{order.orderState}</OrderStatus>
        <EditBtn>
          <button onClick={() => hadleOpenEditModal(order.orderId)}>
            수정
          </button>
        </EditBtn>
      </OrderItem>
    );
  };

  return (
    <div>
      {orders.length === 0 ? (
        <div>로딩중입니다.</div>
      ) : (
        currentOrders.map((order, index) => (
          <OrderBox
            order={order}
            index={index}
            hadleOpenEditModal={hadleOpenEditModal}
          />
        ))
      )}
      {isOpenEditModal && (
        <OrderEditModal
          order={orders.find((order) => order.orderId === selectOrderNum)}
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

const OrderItem = styled.div`
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
const OrderNum = styled.div`
  width: 8%;
  text-decoration: underline;
  cursor: pointer;
`;
const OrderDate = styled.div`
  width: 10%;
`;
const OrderName = styled.div`
  width: 12%;
`;
const OrderProd = styled.div`
  width: 13%;
`;
const OrderPrice = styled.div`
  width: 8%;
`;
const OrderPay = styled.div`
  width: 10%;
`;
const OrderShipment = styled.div`
  width: 12%;
`;
const OrderStatus = styled.div`
  display: flex;
  width: 5%;
`;
const EditBtn = styled.div`
  width: 5%;
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
  margin: 10px auto;
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

export default OrderList;
