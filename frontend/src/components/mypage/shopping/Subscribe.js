import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { setActiveTab } from "../../../store/modules/mypage";
import { Link } from "react-router-dom";
import { getMemberSubscribe } from "../../../api/SubscribeSendApi";
import { getCookie } from "../../../utils/Cookies";
import { SubscribeItem } from "./SubscribeItem";

export const Subscribe = () => {
  const [subscribeList, setSubscribeList] = useState([]);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSubscribeData = async () => {
      await getMemberSubscribe(getCookie("accessToken")).then((response) => {
        setSubscribeList(response);
        setIsLoading(false);
        dispatch(setActiveTab("구독 내역"));
      });
    };
    fetchSubscribeData();
  }, [dispatch]);

  if (isLoading) {
    return <div style={{ height: "100vh" }}></div>;
  }

  return (
    <Wrap>
      <ContentBar>
        <ContentHeader>구독 내역</ContentHeader>
      </ContentBar>
      {subscribeList.length === 0 ? (
        <Content>
          구독 이력이 없습니다.
          <StyledLink to="/exp/subs">구독하러 가기</StyledLink>
        </Content>
      ) : (
        <>
          <ItemInfoBox>
            <ItemBigBox>
              <ItemName>구독 상품 정보</ItemName>
            </ItemBigBox>
            <ItemSmallBox>
              <OrderDate>이용 일자</OrderDate>
            </ItemSmallBox>
            <ItemSmallBox>
              <OrderAmount>결제 금액</OrderAmount>
            </ItemSmallBox>
            <ItemSmallBox>
              <OrderState></OrderState>
            </ItemSmallBox>
          </ItemInfoBox>
          {subscribeList.map((item, index) => (
            <SubscribeItem
              item={item}
              key={index}
            />
          ))}
        </>
      )}
    </Wrap>
  );
};

const Wrap = styled.div`
  min-height: 500px;
`;

const ContentBar = styled.div``;

const ContentHeader = styled.div`
  padding: 0px 0px 20px;
  font-size: 1.8rem;
  font-weight: 700;
  border-bottom: 1px solid grey;
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

const ItemInfoBox = styled.div`
  padding: 20px 0;
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid grey;
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
