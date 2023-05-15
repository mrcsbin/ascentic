import styled from "styled-components";
import PRODUCT_IMAGE from "../../../assets/storemain.jpeg";

export const OrderItem = () => {
  return (
    <>
      <ItemCard>
        <ItemInfoBox>
          <ItemImage src={PRODUCT_IMAGE} alt="상품 이미지" />
          <ItemNameOptionBox>
            <ItemName>Naaaaaaaaame</ItemName>
            <ItemOption>Oooooooption</ItemOption>
          </ItemNameOptionBox>
        </ItemInfoBox>
        <ItemOrderDate>2023-05-12</ItemOrderDate>
        <ItemAmountBox>
          <ItemAmount>30,000원</ItemAmount>
          <ItemCount>2개</ItemCount>
        </ItemAmountBox>
        <ItemOrderState>배송 준비 중</ItemOrderState>
      </ItemCard>
      <ItemCard>
        <ItemInfoBox>
          <ItemImage src={PRODUCT_IMAGE} alt="상품 이미지" />
          <ItemNameOptionBox>
            <ItemName>Naaaaaaaaame</ItemName>
            <ItemOption>Oooooooption</ItemOption>
          </ItemNameOptionBox>
        </ItemInfoBox>
        <ItemOrderDate>2023-05-12</ItemOrderDate>
        <ItemAmountBox>
          <ItemAmount>30,000원</ItemAmount>
          <ItemCount>2개</ItemCount>
        </ItemAmountBox>
        <ItemOrderState>배송 준비 중</ItemOrderState>
      </ItemCard>
      <ItemCard>
        <ItemInfoBox>
          <ItemImage src={PRODUCT_IMAGE} alt="상품 이미지" />
          <ItemNameOptionBox>
            <ItemName>Naaaaaaaaame</ItemName>
            <ItemOption>Oooooooption</ItemOption>
          </ItemNameOptionBox>
        </ItemInfoBox>
        <ItemOrderDate>2023-05-12</ItemOrderDate>
        <ItemAmountBox>
          <ItemAmount>30,000원</ItemAmount>
          <ItemCount>2개</ItemCount>
        </ItemAmountBox>
        <ItemOrderState>배송 준비 중</ItemOrderState>
      </ItemCard>
    </>
  );
};

const ItemCard = styled.div`
  box-sizing: border-box;
  padding: 25px 0;
  display: flex;
  border-bottom: 1px solid grey;
`;

const ItemInfoBox = styled.div`
  width: 40%;
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

const ItemOption = styled.div`
  color: grey;
`;

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
