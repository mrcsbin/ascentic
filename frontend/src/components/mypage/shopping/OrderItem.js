import { Link } from "react-router-dom";
import styled from "styled-components";

export const OrderItem = ({ item }) => {
  function addComma(num) {
    var regexp = /\B(?=(\d{3})+(?!\d))/g;
    return num.toString().replace(regexp, ",");
  }

  return (
    <>
      <ItemCard>
        <StyledLink
          to={`/store/productdetail/${item.productNum}`}
          style={{ color: "black", textDecoration: "none", display: "flex" }}
        >
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
        </StyledLink>
        <ItemOrderDate>{item.orderDate}</ItemOrderDate>
        <ItemAmountBox>
          <ItemAmount>{addComma(item.orderProductPrice)} 원</ItemAmount>
          <ItemCount>{item.orderProductCount} 개</ItemCount>
        </ItemAmountBox>
        <ItemOrderState>{item.orderShippingState}</ItemOrderState>
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

const StyledLink = styled(Link)`
  color: "black";
  text-align: none;
  display: flex;
  width: 40%;
`;

const ItemInfoBox = styled.div`
  width: 100%;
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
