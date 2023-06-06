import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getCookie } from "../../utils/Cookies";
import { getMyPageProfileSubscribe } from "../../api/SubscribeSendApi";

function addComma(num) {
  var regexp = /\B(?=(\d{3})+(?!\d))/g;
  return num.toString().replace(regexp, ",");
}

export const MyPageProfileSubscribe = ({ setTaste }) => {
  const [subscribe, setSubscribe] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [nextPaymentDate, setNextPaymentDate] = useState();

  useEffect(() => {
    const fetchSubscribeData = async () => {
      await getMyPageProfileSubscribe(getCookie("accessToken"))
        .then((response) => {
          setSubscribe(response);
          setIsLoading(false);
          const startDate = new Date(response.subscribeStartDate);
          const nextPaymentDate = new Date(
            startDate.setMonth(startDate.getMonth() + 1)
          );

          const formattedDate = `${nextPaymentDate.getFullYear()} . ${
            nextPaymentDate.getMonth() + 1
          } . ${nextPaymentDate.getDate()}`;
          setNextPaymentDate(formattedDate);
          setTaste(subscribe.tasteResult);
        })
        .catch((e) => {
          setIsLoading(false);
        });
    };
    fetchSubscribeData();
  }, []);

  if (isLoading) {
    return <div></div>;
  }

  return (
    <>
      <ContentBox>
        <ContentTitle>구독중인상품</ContentTitle>
        <ContentPlusButton to="/mypage/subscribe">
          더보기 &gt;
        </ContentPlusButton>
      </ContentBox>
      <Wrap>
        <DownSide>
          {subscribe === undefined ? (
            <DownSideContent>
              구독중인 상품이 없습니다.
              <ExpLink to="/exp/subs">구독하러가기</ExpLink>
            </DownSideContent>
          ) : (
            <>
              <ItemCard>
                <Title>이번달의 패키지</Title>
                <ItemBox>
                  <ImageBox>
                    <Image
                      src={`http://localhost:8080/images/${subscribe.subscribeProductImage}`}
                    ></Image>
                  </ImageBox>
                  <ItemInfoBox>
                    <Name>
                      {subscribe.subscribeProductScent}향 패키지 :&nbsp;
                      {subscribe.subscribeProductScentNoteName}
                    </Name>
                    <Info>{subscribe.subscribeProductInfo}</Info>
                    <ButtonBox>
                      <LeftBox>
                        <PaymentDay>다음 결제일 : {nextPaymentDate}</PaymentDay>
                      </LeftBox>
                      <RightBox>
                        <Price>
                          {addComma(subscribe.subscribeProductPrice)}원
                        </Price>
                        <Button to="/exp/subsmanage">한줄평 작성</Button>
                      </RightBox>
                    </ButtonBox>
                  </ItemInfoBox>
                </ItemBox>
              </ItemCard>
            </>
          )}
        </DownSide>
      </Wrap>
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

const Wrap = styled.div``;

const DownSide = styled.div``;

const DownSideContent = styled.div`
  padding: 10rem 0;
  font-size: 1rem;
  color: rgba(34, 34, 34, 0.5);
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ExpLink = styled(Link)`
  color: rgba(34, 34, 34, 0.5);
  font-size: 1rem;
  text-decoration: none;
  margin-top: 10px;
  border: 1px solid rgba(34, 34, 34, 0.5);
  padding: 10px;
  border-radius: 10px;
`;

const ItemCard = styled.div`
  width: 100%;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #bbbaba;
  padding: 3rem 0;
`;

const ItemBox = styled.div`
  display: flex;
  justify-content: center;
`;

const Title = styled.div`
  margin-bottom: 2rem;
  font-size: 1.3rem;
`;

const ImageBox = styled.div`
  width: 30%;
  height: 100%;
`;

const ItemInfoBox = styled.div`
  width: 50%;
`;

const Image = styled.img`
  width: 250px;
  height: 250px;
`;

const Name = styled.div`
  font-size: 1.1rem;
  line-height: 2;
  font-weight: 600;
`;

const Info = styled.div`
  font-size: 1rem;
  line-height: 2;
  word-break: keep-all;
  height: 100px;
  margin: 30px 0;
  color: rgba(34, 34, 34, 0.5);
`;

const PaymentDay = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Price = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  /* text-align: right; */
  /* width: 100%; */
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LeftBox = styled.div`
  display: flex;
`;

const RightBox = styled.div`
  display: flex;
`;

const Button = styled(Link)`
  color: rgba(34, 34, 34, 0.5);
  font-size: 1rem;
  text-decoration: none;
  border: 1px solid rgba(34, 34, 34, 0.5);
  padding: 10px;
  border-radius: 10px;
`;
