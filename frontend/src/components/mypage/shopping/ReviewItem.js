import styled from "styled-components";

export const ReviewItem = ({ item }) => {
  function addComma(num) {
    var regexp = /\B(?=(\d{3})+(?!\d))/g;
    return num.toString().replace(regexp, ",");
  }

  return (
    <>
      <ItemCard>
        <ItemInfoBox>
          <ItemImage
            src={`http://localhost:8080/images/${item.productImage}`}
            alt="상품 이미지"
          />
          <ItemNameOptionBox>
            <ItemName>{item.productName}</ItemName>
            <ItemOption>{item.productOptionName}</ItemOption>
          </ItemNameOptionBox>
        </ItemInfoBox>
        <ItemOrderDate>{item.orderDate}</ItemOrderDate>
        <ItemAmountBox>
          <ItemAmount>{addComma(item.orderProductPrice)} 원</ItemAmount>
          <ItemCount>{item.orderProductQuantity} 개</ItemCount>
        </ItemAmountBox>
        <ItemOrderState>
          {item.orderShippingState ? "배송 완료" : "배송 준비 중"}
        </ItemOrderState>
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
