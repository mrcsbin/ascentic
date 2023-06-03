import styled from "styled-components";
import { OrderItem } from "./OrderItem";
import { useEffect, useState } from "react";
import { getCookie } from "../../../utils/Cookies";
import { getOrderProductList } from "../../../api/OrderProduct";
import { useDispatch } from "react-redux";
import { setActiveTab } from "../../../store/modules/mypage";

export const OrderList = () => {
  const [orderList, setOrderList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProductData = async () => {
      const response = await getOrderProductList(getCookie("accessToken"));
      setOrderList(
        response.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
      );
      await dispatch(setActiveTab("주문 내역"));
      setIsLoading(false);
    };
    fetchProductData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <OrderListWrap>
      <ContentHeader>주문 내역</ContentHeader>
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
          <OrderState>주문상태</OrderState>
        </ItemSmallBox>
      </ItemInfoBox>
      {orderList.length === 0 ? (
        <IsNotItem>주문하신 상품이 없습니다.</IsNotItem>
      ) : (
        orderList.map((item, index) => <OrderItem item={item} key={index} />)
      )}
    </OrderListWrap>
  );
};

const OrderListWrap = styled.div`
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

const IsNotItem = styled.div``;
