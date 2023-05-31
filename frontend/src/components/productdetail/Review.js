import styled from "styled-components";
import TEST_IMAGE from "../../assets/correct.png";

const Review = ({ item }) => {
  return (
    <>
      <Wrapper>
        <LeftContainer>
          <Score>점수 {item.reviewScore}</Score>
          <Date>날짜 {item.reviewDate}</Date>
        </LeftContainer>
        <RightContainer>
          <ReviewComment>{item.reviewContent}</ReviewComment>
          <DownSide>
            <ReviewRecommend>
              <Title>이 리뷰가 도움이 되었나요?</Title>
              <Good src={TEST_IMAGE} />
              <Bad src={TEST_IMAGE} />
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
  border-bottom: 1px solid grey;
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
  padding: 20px 0;
  box-sizing: border-box;
`;

const RightContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
`;

const ReviewComment = styled.div`
  padding: 20px 0;
  box-sizing: border-box;
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

const Title = styled.div``;

const Good = styled.img`
  width: 15px;
  padding: 0 10px;
`;

const Bad = styled.img`
  width: 15px;
  padding: 0 10px;
`;

const ReviewId = styled.div`
  padding: 20px 0;
  box-sizing: border-box;
`;
