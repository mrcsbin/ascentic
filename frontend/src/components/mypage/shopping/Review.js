import styled from "styled-components";
import { ReviewItem } from "./ReviewItem";

export const Review = () => {
  return (
    <ReviewListWrap>
      <ContentHeader>구매 후기</ContentHeader>
      <ItemInfoBox>
        <ItemBigBox>
          <ItemName>상품 정보</ItemName>
        </ItemBigBox>
        <ItemSmallBox>
          <OrderDate>주문 일자</OrderDate>
        </ItemSmallBox>
        <ItemSmallBox>
          <OrderAmount>주문금액 (수량)</OrderAmount>
        </ItemSmallBox>
        <ItemSmallBox>
          <OrderState>후기</OrderState>
        </ItemSmallBox>
      </ItemInfoBox>
      <ReviewItem />
    </ReviewListWrap>
  );
};

const ReviewListWrap = styled.div`
  border-bottom: 2px solid black;
`;

const ContentHeader = styled.div`
  padding: 20px 0;
  font-size: 30px;
  font-weight: 700;
  border-bottom: 2px solid black;
`;

const ItemInfoBox = styled.div`
  padding: 20px 0;
  display: flex;
  justify-content: space-around;
  border-bottom: 2px solid black;
`;

const ItemBigBox = styled.div`
  width: 40%;
`;

const ItemName = styled.div`
  text-align: center;
`;

const ItemSmallBox = styled.div`
  width: 20%;
`;

const OrderDate = styled.div`
  text-align: center;
`;

const OrderAmount = styled.div`
  text-align: center;
`;

const OrderState = styled.div`
  text-align: center;
`;
