import styled, { keyframes } from "styled-components";
import emptyCart from "../../assets/emptyCart.png";

export const EmptyCart = () => {
  return (
    <EmptyCartWrap>
      <EmptyCartContainer>
        <NothingOnCart>장바구니가 비어있습니다!</NothingOnCart>
        <EmptyImage src={emptyCart} alt="empty_cart" />
        <GoShoppingButton href="/storemain">향 담으러 가기 😊</GoShoppingButton>
      </EmptyCartContainer>
    </EmptyCartWrap>
  );
};

const EmptyCartWrap = styled.div`
  padding-top: 70px;
`;

const EmptyCartContainer = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 120px auto;
  box-sizing: border-box;
  text-align: center;
`;

const EmptyImage = styled.img`
  display: block;
  max-width: 160px;
  margin: 0 auto;
`;
const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const GoShoppingButton = styled.a`
  display: block;
  margin-top: 50px;
  padding: 10px;
  font-size: 1.3em;
  line-height: 26px;
  color: white;
  box-sizing: border-box;
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
  animation: ${fadeIn} 0.5s ease-in-out;
  background-color: black;
  border: 2px solid black;
  border-radius: 4px;
  transition: background-color 0.3s ease-in-out, border-color 0.3s ease-in-out;

  &:hover {
    background-color: rgba(0, 0, 0, 0.6);
    border-color: rgba(0, 0, 0, 0.6);
  }
`;
const NothingOnCart = styled.p`
  margin: 20px;
  font-size: 1.5em;
  font-weight: bold;
`;
