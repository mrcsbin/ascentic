import styled from "styled-components";
import IS_LIKE from "../../assets/productdetail/is-like.png";
import IS_NOT_LIKE from "../../assets/productdetail/is-not-like.png";
import StarRating from "./StarRating";
import { useState } from "react";

const Review = ({ item, handleReviewClick }) => {
  const [isReviewGood, setIsReviewGood] = useState(item.reviewIsGood);
  const [reviewGoodCount, setReviewGoodCount] = useState(item.reviewGoodCount);

  const handleClick = () => {
    if (isReviewGood) {
      setReviewGoodCount(reviewGoodCount - 1);
    } else {
      setReviewGoodCount(reviewGoodCount + 1);
    }
    setIsReviewGood(!isReviewGood);
    handleReviewClick(item.reviewNum);
  };

  return (
    <>
      <Wrapper>
        <LeftContainer>
          <Score>
            <StarRating rating={item.reviewScore * 20}></StarRating>
          </Score>
          <Date> {item.reviewDate}</Date>
        </LeftContainer>
        <RightContainer>
          <ReviewComment>{item.reviewContent}</ReviewComment>
          <DownSide>
            <ReviewRecommend>
              <Title>이 리뷰가 도움이 되었나요?</Title>
              <Good
                onClick={() => handleClick()}
                src={isReviewGood ? IS_LIKE : IS_NOT_LIKE}
                isClicked={isReviewGood}
              />
              <GoodCount>{reviewGoodCount}</GoodCount>
            </ReviewRecommend>
            <ReviewIdAndProd>
              <ReviewId>작성자 : {item.memberId}</ReviewId>
              <ReviewProductOption>
                구매한 옵션 : {item.reviewProductOptionName}
              </ReviewProductOption>
            </ReviewIdAndProd>
          </DownSide>
        </RightContainer>
      </Wrapper>
    </>
  );
};

export default Review;

const Wrapper = styled.div`
  display: flex;
  padding: 30px 0;
  box-sizing: border-box;
  border-top: 1px solid grey;
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  width: 20%;
`;

const Score = styled.div`
  padding: 20px 0;
  box-sizing: border-box;
`;

const Date = styled.div`
  font-size: 1.2rem;
  padding: 20px 0;
  box-sizing: border-box;
`;

const RightContainer = styled.div`
  padding-left: 2rem;
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
`;

const ReviewComment = styled.div`
  padding: 20px 0;
  box-sizing: border-box;
  font-size: 1.4rem;
`;

const DownSide = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const ReviewRecommend = styled.div`
  display: flex;
  padding: 20px 0;
  box-sizing: border-box;
`;

const ReviewIdAndProd = styled.div`
  display: flex;
`;

const Title = styled.div`
  font-size: 1.1rem;
`;

const Good = styled.img`
  width: 20px;
  padding: 0 5px 0 30px;
  cursor: pointer;
`;

const GoodCount = styled.div`
  font-size: 1.1rem;
`;

const ReviewId = styled.div`
  font-size: 1.2rem;
  padding: 20px 20px;
  box-sizing: border-box;
`;

const ReviewProductOption = styled.div`
  font-size: 1.2rem;
  padding: 20px 0;
  box-sizing: border-box;
`;
