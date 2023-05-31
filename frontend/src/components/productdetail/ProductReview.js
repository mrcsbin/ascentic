import styled from "styled-components";

const ProductReview = ({ review }) => {
  return (
    <>
      <Wrapper>
        <Title>제품 정보</Title>
      </Wrapper>
    </>
  );
};

export default ProductReview;

const Wrapper = styled.div`
  width: 70%;
  margin: 0 auto;
`;

const Title = styled.div`
  font-size: 2.5rem;
  text-align: center;
  font-weight: bold;
`;
