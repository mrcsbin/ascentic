import styled from "styled-components";
import CHECK_IMAGE from "../../assets/productdetail/check.png";
import StarRating from "./StarRating";

const Review = ({ item }) => {
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
              <Good src={CHECK_IMAGE} />
              <GoodCount>5</GoodCount>
            </ReviewRecommend>
            <ReviewId>작성자 : {item.memberId}</ReviewId>
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

const UpSide = styled.div``;

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

const Title = styled.div`
  font-size: 1.1rem;
`;

const Good = styled.img`
  width: 20px;
  padding: 0 10px 0 20px;
`;

const GoodCount = styled.div`
  font-size: 1.1rem;
`;

const ReviewId = styled.div`
  font-size: 1.2rem;
  padding: 20px 0;
  box-sizing: border-box;
`;
