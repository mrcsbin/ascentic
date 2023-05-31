import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Review from "./Review";

function ProductInfo({ review, productName, productCategory }) {
  const contentRef = useRef();
  const [contentHeight, setContentHeight] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const totalScore = review.reduce(
    (sum, review) => sum + review.reviewScore,
    0
  );
  const averageScore = totalScore / review.length;

  useEffect(() => {
    setContentHeight(contentRef?.current?.clientHeight ?? 0);
  }, []);

  return (
    <Wrapper>
      <Header>제품 정보</Header>
      <AccordionWrapper>
        <AccordionDetails onClick={handleToggle}>
          <AccordionSummary>
            <SummaryText>제품 설명</SummaryText>
            <ArrowIcon />
          </AccordionSummary>
        </AccordionDetails>
        <AccordionContentWrapper>
          <AccordionContent contentHeight={contentHeight} ref={contentRef}>
            <Title>제품 설명</Title>
            <Content>제품 설명이요</Content>
            <Title>사용법</Title>
            <Content>사용법이요</Content>
          </AccordionContent>
        </AccordionContentWrapper>
      </AccordionWrapper>
      <AccordionWrapper>
        <AccordionDetails>
          <AccordionSummary>
            <SummaryText>리뷰</SummaryText>
            <ArrowIcon />
          </AccordionSummary>
        </AccordionDetails>
        <AccordionContentWrapper>
          <AccordionContent contentHeight={contentHeight} ref={contentRef}>
            <Title>{productName}</Title>
            <Content>{productCategory}</Content>
            <ReviewScoreBox>
              <LeftBox>
                <ReviewScoreImage>별 이미지</ReviewScoreImage>
                <ReviewScore> {averageScore}</ReviewScore>
                <ReviewCount>리뷰 {review.length}</ReviewCount>
              </LeftBox>
              <RightBox>
                <Filter>인기순</Filter>
                <Filter>최신순</Filter>
                <Filter>별점 높은순</Filter>
                <Filter>별점 낮은순</Filter>
              </RightBox>
            </ReviewScoreBox>
            {review.length ? (
              review.map((item, index) => <Review item={item} key={index} />)
            ) : (
              <div>없다</div>
            )}
          </AccordionContent>
        </AccordionContentWrapper>
      </AccordionWrapper>
      <AccordionWrapper>
        <AccordionDetails>
          <AccordionSummary>
            <SummaryText>배송 & 반품</SummaryText>
            <ArrowIcon />
          </AccordionSummary>
        </AccordionDetails>
        <AccordionContentWrapper>
          <AccordionContent contentHeight={contentHeight} ref={contentRef}>
            <Title>배송</Title>
            <Content>
              * 3만원 이상 구매하실 경우 배송 비용은 무료입니다.
            </Content>
            <Content>
              * 주문일로부터 1-2 영업일 이내 출고됩니다. 배송은 지역 택배사
              사정에 따라 약간의 지연이 생길 수 있습니다.
            </Content>
            <Content>
              * 배송이 시작되면 구매자에게는 이메일, 수령인에게는 카카오
              알림톡으로 배송 정보를 전송해 드립니다.
              CJ대한통운(https://www.cjlogistics.com)
            </Content>
            <Title>환불</Title>
            <Content>
              * 상품 혹은 증정품의 포장(랩핑)을 개봉 및 훼손한 경우 반품이
              불가합니다.
            </Content>
            <Content>
              * 단순 변심 또는 주문 실수로 인한 교환이 불가합니다. 신중한 구매
              부탁드립니다.
            </Content>
          </AccordionContent>
        </AccordionContentWrapper>
      </AccordionWrapper>
    </Wrapper>
  );
}

export default ProductInfo;

const Wrapper = styled.div`
  width: 70%;
  margin: 0 auto;
  border-bottom: 1px solid grey;
  height: 100%;
  position: relative;
`;

const Header = styled.div`
  font-size: 2.5rem;
  text-align: center;
  font-weight: 600;
  padding-bottom: 5%;
`;

const AccordionWrapper = styled.div`
  border-bottom: 1px solid #e5e8eb;
  border-top: 1px solid grey;
  padding: 2rem 0;
  width: 100%;
`;

const AccordionDetails = styled.details`
  /* cursor: pointer; */
`;

const AccordionSummary = styled.summary`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SummaryText = styled.span``;

const ArrowIcon = styled.div`
  transition: transform 0.5s;
  width: 10px;
  height: 10px;
  border-top: 2px solid grey;
  border-right: 2px solid grey;
  transform: rotate(-45deg);

  ${AccordionDetails}[open] ${AccordionSummary} & {
    transform: rotate(135deg);
  }
`;

const AccordionContentWrapper = styled.div`
  overflow: hidden;
`;

const AccordionContent = styled.div`
  transition: 0.4s ease-in-out;
  margin-top: -${(props) => props.contentHeight}px;
  opacity: 0;

  ${AccordionDetails}[open] + ${AccordionContentWrapper} > & {
    margin-top: 20px;
    opacity: 1;
  }
`;

const Title = styled.div`
  font-size: 1.5rem;
  padding-top: 2rem;
`;

const Content = styled.div`
  font-size: 1rem;
  padding: 2rem 0 0 0;
  color: grey;
  box-sizing: border-box;
`;

const LeftBox = styled.div`
  width: 30%;
  display: flex;
`;

const RightBox = styled.div`
  display: flex;
`;

const Filter = styled.div`
  padding-left: 15px;
  box-sizing: border-box;
  cursor: pointer;
`;

const ReviewScoreBox = styled.div`
  display: flex;
  margin-top: 40px;
  padding: 20px 0;
  border-bottom: 1px solid grey;
  justify-content: space-between;
`;

const ReviewScoreImage = styled.div`
  width: 60%;
`;

const ReviewScore = styled.div`
  font-size: 1.3rem;
  width: 20%;
`;

const ReviewCount = styled.div`
  width: 20%;
  font-size: 1.3rem;
`;
