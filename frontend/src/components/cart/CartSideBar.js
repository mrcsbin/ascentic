import { Link } from "react-router-dom";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

function Contents({ cartItems }) {
  const prices = cartItems.map((item) => item.prodPrice * item.prodCount);
  const totalPrice = prices.reduce((acc, curr) => acc + curr, 0);
  const shippingFee = 3000;
  const discountAmount = 3000;

  return (
    <>
      <ContentsBox>
        <LeftSpan>상품금액&nbsp;&nbsp;</LeftSpan>
        <RightSpan>{totalPrice}원</RightSpan>
      </ContentsBox>
      <ContentsBox>
        <LeftSpan>배송비&nbsp;</LeftSpan>
        <RightSpan>+ {shippingFee} 원</RightSpan>
      </ContentsBox>
      <ContentsBox>
        <LeftSpan>할인금액&nbsp;</LeftSpan>
        <RightSpan>- {discountAmount} 원</RightSpan>
      </ContentsBox>
      <Amounts>
        <LeftSpan style={{ fontWeight: 900, fontSize: 20 }}>
          결제 예정금액&nbsp;
        </LeftSpan>
        <RightSpan style={{ fontWeight: 900, fontSize: 20 }}>
          {shippingFee + totalPrice - discountAmount} 원
        </RightSpan>
      </Amounts>
    </>
  );
}

export const CartSideBar = () => {
  const cartItems = useSelector((state) => state.cart.cartItem);
  const dispatch = useDispatch();

  const clickHandler = () => {
    dispatch("/order 로 상품정보 보내는 api 호출");
  };

  return (
    <SideBarWrap>
      <SideBarContainer>
        <SideBarContent>
          <Contents cartItems={cartItems} />
        </SideBarContent>
        <Link>
          <OrderButton type="button" onClick={clickHandler}>
            구매하기
          </OrderButton>
        </Link>
      </SideBarContainer>
    </SideBarWrap>
  );
};

// Contents
const ContentsBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0;
  font-size: 16px;
  font-weight: 400;
`;

const Amounts = styled.div`
  margin: 40px 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LeftSpan = styled.div``;

const RightSpan = styled.div`
  font-weight: 700;
  text-align: right;
  font-size: 15px;
`;

// 색 추가
const OrderButton = styled.button`
  width: 100%;
  font-size: 18px;
  min-height: 50px;
  border: 1px solid transparent;
  font-weight: 800;
  border-radius: 7px;
  cursor: pointer;
`;

// CartSideBar
const SideBarWrap = styled.div`
  box-sizing: border-box;
  position: relative;
  width: 100%;
  min-height: 1px;
  flex: 0 0 30%;
  max-width: 30%;
  padding: 35px 15px 0 15px;
`;

const SideBarContainer = styled.div`
  position: sticky;
  top: 81px;
  padding: 30px 0;
`;

const SideBarContent = styled.div`
  margin: 0 0 20px;
  border: 1px solid #ededed;
  border-radius: 6px;
  background-color: #ffffff;
  padding: 10px 20px;
`;
