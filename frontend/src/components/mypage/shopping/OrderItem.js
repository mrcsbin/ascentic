import { useState } from "react";
import styled from "styled-components";
import ReviewModal from "./ReviewModal";
import axios from "axios";

function addComma(num) {
  var regexp = /\B(?=(\d{3})+(?!\d))/g;
  return num.toString().replace(regexp, ",");
}

export const OrderItem = ({ orderId, item }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const clickModalHandle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const cancelClickHandle = async () => {
    const cancelData = {
      cancelAmount: item.orderProductPrice,
      cancelReason: "취소 사유",
      orderId: orderId,
      orderProductNum: item.orderProductNum,
    };

    if (window.confirm("정말 주문을 취소하시겠습니까?")) {
      try {
        const response = await axios
          .post("http://localhost:8080/order/cancel/orderproduct", cancelData, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then(window.location.reload());
        console.log(response.data);
      } catch (error) {
        console.error(
          "주문 결제 취소 요청을 보내는 도중 오류가 발생했습니다:",
          error
        );
      }
    }
  };

  return (
    <>
      <ItemCard>
        <OrderState>{item.orderProductState}</OrderState>
        <ItemBox>
          {/* <StyledLink
            to={`/store/productdetail/${item.productNum}`}
            style={{ color: "black", textDecoration: "none", display: "flex" }}
          > */}
          <ItemInfoBox>
            <ItemImage
              src={`http://localhost:8080/images/${item.productImage}`}
              alt="상품 이미지"
            />
            <ItemNameOptionBox>
              <ItemName>{item.productName}</ItemName>
              <ItemOption>{item.productOptionName}</ItemOption>
              <ItemName>
                {addComma(item.orderProductPrice)}원 &nbsp;&nbsp;
                {item.orderProductCount}개
              </ItemName>
            </ItemNameOptionBox>
          </ItemInfoBox>
          {/* </StyledLink> */}
          <ButtonBox>
            {item.orderProductState === "결제완료" && (
              <OrderCancelButton onClick={() => cancelClickHandle()}>
                주문 취소
              </OrderCancelButton>
            )}
            {item.orderProductState === "배송완료" &&
              item.orderProductReviewState === "리뷰 작성" && (
                <WriteReviewButton
                  onClick={
                    item.orderProductReviewState === "리뷰 작성"
                      ? clickModalHandle
                      : null
                  }
                >
                  {item.orderProductReviewState}
                </WriteReviewButton>
              )}
            {item.orderProductState === "주문취소" && (
              <OrderCancelButton>장바구니에 담기</OrderCancelButton>
            )}
          </ButtonBox>
        </ItemBox>
      </ItemCard>
      {isModalOpen && (
        <ReviewModal item={item} clickModalHandle={clickModalHandle} />
      )}
    </>
  );
};

const OrderState = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  margin: 1rem 30px;
`;

const ItemBox = styled.div`
  display: flex;
`;

const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 30%;
`;

const OrderCancelButton = styled.div`
  width: 80%;
  border-radius: 12px;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 2px 4px 0px,
    rgba(0, 0, 0, 0.16) 0px 0px 1px 0px;
  background-color: rgb(255, 255, 255);
  margin-bottom: 20px;
  padding: 16px 16px 8px;
  box-sizing: border-box;
  font-size: 1.1rem;
  text-align: center;
  font-weight: 500;
  cursor: pointer;
`;

const WriteReviewButton = styled.div`
  font-weight: 500;
  text-align: center;
  font-size: 1.1rem;
  width: 80%;
  border-radius: 12px;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 2px 4px 0px,
    rgba(0, 0, 0, 0.16) 0px 0px 1px 0px;
  background-color: rgb(255, 255, 255);
  margin-bottom: 20px;
  padding: 16px 16px 8px;
  box-sizing: border-box;
  cursor: pointer;
`;

const ItemCard = styled.div`
  width: 100%;
  border-radius: 12px;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 2px 4px 0px,
    rgba(0, 0, 0, 0.16) 0px 0px 1px 0px;
  background-color: rgb(255, 255, 255);
  margin-bottom: 20px;
  padding: 24px 24px 16px;
  box-sizing: border-box;
`;

const ItemInfoBox = styled.div`
  width: 70%;
  display: flex;
`;

const ItemImage = styled.img`
  width: 100px;
  height: 100px;
  margin: 0 30px;
`;

const ItemNameOptionBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ItemName = styled.div`
  padding: 15px 0;
`;

const ItemOption = styled.div``;
