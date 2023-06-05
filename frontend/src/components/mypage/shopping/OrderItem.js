import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ReviewModal from "./ReviewModal";

function addComma(num) {
  var regexp = /\B(?=(\d{3})+(?!\d))/g;
  return num.toString().replace(regexp, ",");
}

export const OrderItem = ({ item }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const clickModalHandle = () => {
    setIsModalOpen(!isModalOpen);
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
            {item.orderProductState === "결제 완료" && (
              <OrderCancelButton>주문 취소</OrderCancelButton>
            )}
            {item.orderProductState === "배송 완료" && (
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
  /* box-sizing: border-box;
  padding: 25px 0;
  display: flex;
  border-bottom: 1px solid grey; */
  width: 100%;
  border-radius: 12px;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 2px 4px 0px,
    rgba(0, 0, 0, 0.16) 0px 0px 1px 0px;
  background-color: rgb(255, 255, 255);
  margin-bottom: 20px;
  padding: 24px 24px 16px;
  box-sizing: border-box;
`;

const StyledLink = styled(Link)`
  color: "black";
  text-align: none;
  display: flex;
  width: 40%;
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

const ItemOrderDate = styled.div`
  text-align: center;
  width: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ItemAmountBox = styled.div`
  width: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;

const ItemAmount = styled.div`
  padding: 15px 0;
  text-align: center;
`;

const ItemCount = styled.div`
  text-align: center;
`;

const ItemOrderState = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 20%;
`;
