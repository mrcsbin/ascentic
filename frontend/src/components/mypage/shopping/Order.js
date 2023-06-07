import styled from "styled-components";
import { OrderList } from "./OrderList";
import { useEffect, useState } from "react";
import { getCookie } from "../../../utils/Cookies";
import { useDispatch } from "react-redux";
import { setActiveTab } from "../../../store/modules/mypage";
import { getOrderList } from "../../../api/OrderApi";
import { Link } from "react-router-dom";

export const Order = () => {
  const [orderList, setOrderList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState("전체");
  const [filteredList, setFilteredList] = useState([]);
  console.log(filteredList)
  const filterClickHandle = (period) => {
    const filter = new Date();
    filter.setMonth(filter.getMonth() - period);
    const filteredOrderList = orderList.filter(
      (order) => new Date(order.orderDate) >= filter
    );

    setFilteredList(
      filteredOrderList.sort(
        (a, b) => new Date(b.orderDate) - new Date(a.orderDate)
      )
    );
    setFilter(`${period}개월`);
  };

  useEffect(() => {
    const fetchProductData = async () => {
      await getOrderList(getCookie("accessToken")).then((response) => {
        setOrderList(
          response.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
        );
        setFilteredList(
          response.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
        );
      });
      dispatch(setActiveTab("주문 내역"));
      setIsLoading(false);
    };
    fetchProductData();
  }, [dispatch]);

  if (isLoading) {
    return <div style={{ height: "100vh" }}></div>;
  }

  return (
    <OrderListWrap>
      <ContentBar>
        <ContentHeader>주문 내역</ContentHeader>
        {orderList.length !== 0 && (
          <FilterBox>
            <FilterHeader>보기설정</FilterHeader>
            <Filter
              isFilter={filter === "전체"}
              onClick={() => {
                setFilteredList(
                  orderList.sort(
                    (a, b) => new Date(b.orderDate) - new Date(a.orderDate)
                  )
                );
                setFilter("전체");
              }}
            >
              전체
            </Filter>
            <Filter
              isFilter={filter === "3개월"}
              onClick={() => filterClickHandle(3)}
            >
              3 개월
            </Filter>
            <Filter
              isFilter={filter === "6개월"}
              onClick={() => filterClickHandle(6)}
            >
              6 개월
            </Filter>
            <Filter
              isFilter={filter === "12개월"}
              onClick={() => filterClickHandle(12)}
            >
              1 년
            </Filter>
          </FilterBox>
        )}
      </ContentBar>
      {orderList.length === 0 ? (
        <Content>
          주문 내역이 없습니다.
          <StyledLink to="/StoreMain">스토어로 이동</StyledLink>
        </Content>
      ) : (
        filteredList.map((item, index) => (
          <OrderList
            itemCount={filteredList.length}
            item={item}
            key={index}
          ></OrderList>
        ))
      )}
      {filteredList.length === 0 && filter === "3개월" && (
        <Content>최근 3개월 내 주문 내역이 없습니다.</Content>
      )}
      {filteredList.length === 0 && filter === "6개월" && (
        <Content>최근 6개월 내 주문 내역이 없습니다.</Content>
      )}
      {filteredList.length === 0 && filter === "12개월" && (
        <Content>최근 1년 내 주문 내역이 없습니다.</Content>
      )}
    </OrderListWrap>
  );
};

const OrderListWrap = styled.div`
  min-height: 500px;
`;

const ContentBar = styled.div`
  border-bottom: 1px solid grey;
  display: flex;
  justify-content: space-between;
`;

const ContentHeader = styled.div`
  cursor: default;
  padding: 0 0 20px 0;
  font-size: 1.8rem;
  font-weight: 700;
`;

const FilterBox = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const FilterHeader = styled.div`
  cursor: default;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 11px;
`;

const Filter = styled.div`
  border: ${(props) => (props.isFilter ? "2px solid black" : "1px solid grey")};
  padding: 10px 11px;
  width: 60px;
  border-radius: 10px;
  text-align: center;
  margin-right: 11px;
  cursor: pointer;
  font-weight: ${(props) => props.isFilter && "bold"};
`;

const Content = styled.div`
  height: 500px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: rgba(34, 34, 34, 0.5);
  font-size: 1rem;
`;

const StyledLink = styled(Link)`
  color: rgba(34, 34, 34, 0.5);
  font-size: 1rem;
  text-decoration: none;
  margin-top: 10px;
  border: 1px solid rgba(34, 34, 34, 0.5);
  padding: 10px;
  border-radius: 10px;
`;
