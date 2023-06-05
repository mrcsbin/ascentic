import styled from "styled-components";
import { OrderItem } from "./OrderItem";
import { Link } from "react-router-dom";

export const OrderList = ({ item }) => {
  return (
    <>
      <Wrap>
        <InfoBar>
          <InfoBox>
            <OrderDate>주문 날짜 : {item.orderDate} </OrderDate>
            <OrderId>주문 번호 : {item.orderId}</OrderId>
          </InfoBox>
          <StyledLink to={`/ordercomplete?orderId=${item.orderId}`}>
            <OrderDetail>주문 상세 보기</OrderDetail>
          </StyledLink>
        </InfoBar>
        {item.orderProductList.map((item, index) => (
          <OrderItem item={item} key={index} />
        ))}
      </Wrap>
    </>
  );
};

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

const Wrap = styled.div`
  width: 100%;
  border-radius: 12px;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 2px 4px 0px,
    rgba(0, 0, 0, 0.16) 0px 0px 1px 0px;
  background-color: rgb(255, 255, 255);
  margin-bottom: 20px;
  padding: 24px 24px 16px;
  box-sizing: border-box;
`;

const InfoBar = styled.div`
  display: flex;
  justify-content: space-between;
`;

const InfoBox = styled.div`
  margin-bottom: 1rem;
`;

const OrderDate = styled.div`
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const OrderId = styled.div`
  color: grey;
  font-size: 1.1rem;
`;

const OrderDetail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
`;
