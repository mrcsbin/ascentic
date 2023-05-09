import styled from "styled-components";
import { CartContentHeader } from "./CartContentHeader";
import { CartContents } from "./CartContents";
import { CartSideBar } from "./CartSideBar";

export const NotEmptyCart = () => {
  return (
    <CartWrap className="cart-wrap">
      <CartHeader className="cart-header">장바구니</CartHeader>
      <CartContainer className="cart-container">
        <CartBox className="cart-box">
          <CartContentsWrap className="cartContents-wrap">
            <CartContentHeader />
            <CartContents />
          </CartContentsWrap>
          <CartSideBar />
        </CartBox>
      </CartContainer>
    </CartWrap>
  );
};

const CartWrap = styled.div`
  position: relative;
  background-color: #f5f5f5;
  flex: 1 0 auto;
`;

const CartHeader = styled.h1`
  padding: 50px 0px 48px;
  font-weight: 500;
  font-size: 28px;
  line-height: 35px;
  text-align: center;
`;

const CartContainer = styled.div`
  box-sizing: border-box;
  margin 0 auto;
  width: 1136px;
  max-width: 100%;
  min-height: 1px;
`;

const CartBox = styled.div`
  // position: relative;
  // display: flex;
  // flex-wrap: wrap;
  // box-sizing: border-box;
  // margin-right: -10px;
  // margin-left: -10px;

  // display: flex;
  // -webkit-box-pack: justify;
  // justify-content: space-between;
  // letter-spacing: -0.5px;

  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  margin: 0 -10px;
  position: relative;
`;

const CartContentsWrap = styled.div`
  box-sizing: border-box;
  position: relative;
  width: 100%;
  min-height: 1px;
  flex: 0 0 66.666666%;
  max-width: 66.666666%;
  padding: 0 10px;
`;
