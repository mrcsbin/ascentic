import styled from "styled-components";
import { CartContents } from "./CartContents";
import { CartSideBar } from "./CartSideBar";


export const NotEmptyCart = ({cartItems}) => {
  console.log("NotEmptyCart.js")
  console.log(cartItems)
  return (
    <CartWrap className="cart-wrap">
      <CartHeader className="cart-header">장바구니</CartHeader>
      <CartContainer className="cart-container">
        <CartBox className="cart-box">
          <CartContents cartItems={cartItems}/>
          <CartSideBar cartItems={cartItems}/>
        </CartBox>
      </CartContainer>
    </CartWrap>
  );
};

const CartWrap = styled.div`
  position: relative;
`;

const CartHeader = styled.h1`
  padding: 50px 0px 30px;
  font-weight: 800;
  font-size: 30px;
  line-height: 35px;
  text-align: center;
`;

const CartContainer = styled.div`
  box-sizing: border-box;
  margin 0 auto;
  width: 1000px;
  max-width: 100%;
  min-height: 1px;
`;

const CartBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -10px;
  position: relative;
`;
