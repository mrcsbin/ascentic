import styled from "styled-components";
import test from "../../assets/wrong.png";

export const EmptyCart = () => {
  return (
    <EmptyCartWrap>
      <EmptyCartContainer>
        <EmptyImage src={test} alt="임시 이미지 입니다 !!!!!!!!!!!!!!!" />
        <GoShoppingButton href="/storemain">스토어로 가기 </GoShoppingButton>
      </EmptyCartContainer>
    </EmptyCartWrap>
  );
};

const EmptyCartWrap = styled.div``;

const EmptyCartContainer = styled.div`
  width: 100%;
  max-width: 220px;
  margin: 120px auto;
  box-sizing: border-box;
  text-align: center;
`;

const EmptyImage = styled.img`
  display: block;
  max-width: 160px;
  margin: 0 auto;
`;

const GoShoppingButton = styled.a`
  display: block;
  margin-top: 50px;
  padding: 10px;
  font-size: 17px;
  line-height: 26px;
  color: black;
  box-sizing: border-box;
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
`;
