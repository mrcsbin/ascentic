import styled from "styled-components";
import { useEffect } from "react";
import { getCookie } from "../../utils/Cookies";
import { useState } from "react";
import { getOrderListInMyPageProfile } from "../../api/OrderApi";
import { Link } from "react-router-dom";

function addComma(num) {
  var regexp = /\B(?=(\d{3})+(?!\d))/g;
  return num.toString().replace(regexp, ",");
}

export const MyPageProfileOrder = () => {
  const [orderList, setOrderList] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProductData = async () => {
      const orderList = await getOrderListInMyPageProfile(
        getCookie("accessToken")
      );
      setOrderList(orderList);
      setIsLoading(false);
    };
    fetchProductData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ContentBox>
        <ContentTitle>주문 내역</ContentTitle>
        <ContentPlusButton to="/mypage/orderlist">
          더보기 &gt;
        </ContentPlusButton>
      </ContentBox>
      {orderList.length === 0 ? (
        <OrderEmpty>
          주문내역이 없습니다.
          <OrderLink to="/StoreMain">스토어로 가기</OrderLink>
        </OrderEmpty>
      ) : (
        orderList.map((item, index) => (
          <Wrap key={index}>
            <DownSide>
              <DownSideContent to={`/ordercomplete?orderId=${item.orderId}`}>
                <LeftBox>
                  <ImageBox>
                    <Image
                      src={`http://localhost:8080/images/${item.productImage}`}
                    />
                  </ImageBox>
                  <ItemBox>
                    {item.orderProductCount === 1 ? (
                      <ItemName>{item.productName}</ItemName>
                    ) : (
                      <ItemName>
                        {item.productName} 등 {item.orderProductCount}개
                      </ItemName>
                    )}
                    <ItemOption>{item.orderState}</ItemOption>
                  </ItemBox>
                </LeftBox>
                <RightBox>
                  <Price>{addComma(item.orderAmount)}원</Price>
                  <OrderDetail>주문 상세 보기</OrderDetail>
                </RightBox>
              </DownSideContent>
            </DownSide>
          </Wrap>
        ))
      )}
    </>
  );
};

const ContentBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 4rem;
`;

const ContentTitle = styled.div`
  font-size: 1.4rem;
  font-weight: 700;
`;

const ContentPlusButton = styled(Link)`
  font-size: 1rem;
  color: rgba(34, 34, 34, 0.5);
  text-decoration: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Wrap = styled.div`
  margin-top: 2rem;
`;

const DownSide = styled.div``;

const OrderEmpty = styled.div`
  padding: 10rem 0;
  font-size: 1rem;
  color: rgba(34, 34, 34, 0.5);
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const OrderLink = styled(Link)`
  color: rgba(34, 34, 34, 0.5);
  font-size: 1rem;
  text-decoration: none;
  margin-top: 10px;
  border: 1px solid rgba(34, 34, 34, 0.5);
  padding: 10px;
  border-radius: 10px;
`;

const DownSideContent = styled(Link)`
  padding: 12px;
  border-bottom: 1px solid #ebebeb;
  display: flex;
  align-items: center;
  cursor: pointer;
  text-decoration: none;
  color: black;
`;

const RightBox = styled.div`
  display: flex;
  margin-left: auto;
  text-align: right;
  align-items: center;
`;

const LeftBox = styled.div`
  display: flex;
`;

const ImageBox = styled.div``;

const Image = styled.img`
  width: 80px;
  height: 80px;
  -o-object-fit: cover;
  object-fit: cover;
  border-radius: 12px;
`;

const ItemBox = styled.div`
  width: 100%;
  margin-left: 16px;
  display: flex;
  flex-direction: column;
  align-self: center;
`;

const ItemName = styled.p`
  line-height: 17px;
  font-size: 1.1rem;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ItemOption = styled.p`
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: -0.5px;
  color: rgba(34, 34, 34, 0.5);
  line-height: 19px;
  margin-top: 4px;
`;

const Price = styled.div`
  margin-left: 10px;
  width: 150px;
`;

const OrderDetail = styled.div`
  margin-left: 10px;
  width: 150px;
`;
