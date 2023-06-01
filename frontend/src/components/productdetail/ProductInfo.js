import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Review from "./Review";
import StarRating from "./StarRating";

function ProductInfo({ review, productName, productCategory }) {
  const contentRef = useRef();
  const [contentHeight, setContentHeight] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState("최신순");

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const totalScore = review.reduce(
    (sum, review) => sum + review.reviewScore,
    0
  );
  const averageScore = (totalScore / review.length).toFixed(1);

  useEffect(() => {
    setContentHeight(contentRef?.current?.clientHeight ?? 0);
  }, []);

  return (
    <Wrapper>
      <Header>제품 정보</Header>
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
      <AccordionWrapper>
        <AccordionDetails>
          <AccordionSummary>
            <SummaryText>리뷰</SummaryText>
            <ArrowIcon />
          </AccordionSummary>
        </AccordionDetails>
        <AccordionContentWrapper>
          <AccordionContent contentHeight={contentHeight} ref={contentRef}>
            {review.length === 0 ? (
              <>
                <Title>리뷰</Title>
                <Content>작성된 리뷰가 없습니다.</Content>
              </>
            ) : (
              <>
                <Title>{productName}</Title>
                <Content>{productCategory}</Content>
                <ReviewScoreBox>
                  <LeftBox>
                    <ReviewScoreImage>
                      <StarRating rating={averageScore * 20}></StarRating>
                    </ReviewScoreImage>
                    <ReviewScore> {averageScore}</ReviewScore>
                    <ReviewCount>리뷰 {review.length}</ReviewCount>
                  </LeftBox>
                  <RightBox>
                    <Filter
                      isFilter={filter === "인기순"}
                      onClick={() => setFilter("인기순")}
                    >
                      인기순
                    </Filter>
                    <Filter
                      isFilter={filter === "최신순"}
                      onClick={() => setFilter("최신순")}
                    >
                      최신순
                    </Filter>
                    <Filter
                      isFilter={filter === "별점 높은순"}
                      onClick={() => setFilter("별점 높은순")}
                    >
                      별점 높은순
                    </Filter>
                    <Filter
                      isFilter={filter === "별점 낮은순"}
                      onClick={() => setFilter("별점 낮은순")}
                    >
                      별점 낮은순
                    </Filter>
                  </RightBox>
                </ReviewScoreBox>
                {filter === "최신순" &&
                  review
                    .sort(
                      (a, b) => new Date(b.reviewDate) - new Date(a.reviewDate)
                    )
                    .map((item, index) => <Review item={item} key={index} />)}
                {filter === "별점 높은순" &&
                  review
                    .sort((a, b) => b.reviewScore - a.reviewScore)
                    .map((item, index) => <Review item={item} key={index} />)}
                {filter === "별점 낮은순" &&
                  review
                    .sort((a, b) => a.reviewScore - b.reviewScore)
                    .map((item, index) => <Review item={item} key={index} />)}
              </>
            )}
          </AccordionContent>
        </AccordionContentWrapper>
      </AccordionWrapper>

    </Wrapper>
  );
}

export default ProductInfo;

const Wrapper = styled.div`
  width: 70%;
  margin: 5% auto 10% auto;
  border-bottom: 1px solid grey;
  height: 100%;
  position: relative;
`;

const Header = styled.div`
  font-size: 2rem;
  text-align: center;
  font-weight: 600;
  padding-bottom: 5%;
`;

const AccordionWrapper = styled.div`
  /* border-bottom: 1px solid #e5e8eb; */
  border-top: 1px solid grey;
  /* padding: 2rem 0; */
  width: 100%;
`;

const AccordionDetails = styled.details`
  cursor: pointer;
`;

const AccordionSummary = styled.summary`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SummaryText = styled.span`
  padding: 2rem 0;
`;

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
  margin-top: -150vh;
  opacity: 0;

  ${AccordionDetails}[open] + ${AccordionContentWrapper} > & {
    margin-top: 20px;
    opacity: 1;
  }
`;

const Title = styled.div`
  font-size: 1.5rem;
  padding-top: 0.5rem;
`;

const Content = styled.div`
  font-size: 1rem;
  padding: 2rem 0;
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
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;
  margin-left: 20px;
  box-sizing: border-box;
  cursor: pointer;
  font-size: 1.1rem;

  ${(props) =>
    props.isFilter &&
    `
    font-weight: bold;
  `}
`;

const ReviewScoreBox = styled.div`
  display: flex;
  /* margin-top: 40px; */
  padding: 30px 0 20px 0;
  /* border-bottom: 1px solid grey; */
  justify-content: space-between;
`;

const ReviewScoreImage = styled.div`
  width: 60%;
`;

const ReviewScore = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;
  font-size: 1.3rem;
  width: 20%;
`;

const ReviewCount = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;
  width: 20%;
  font-size: 1.3rem;
`;
