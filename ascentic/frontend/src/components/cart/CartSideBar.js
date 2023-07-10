import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";

function addComma(num) {
  var regexp = /\B(?=(\d{3})+(?!\d))/g;
  return num.toString().replace(regexp, ",");
}

function Contents({ cartItems }) {
  const checkedItem = useSelector((state) => state.cart.checkedItems);

  const prices = cartItems
    .filter((item) => checkedItem.includes(item.cartNum))
    .map((item) => item.productPrice * item.productCount);
  const totalPrice = prices.reduce((acc, curr) => acc + curr, 0);
  const shippingFee = 3000;
  const discountAmount = 3000;

  return (
    <>
      <ContentsBox>
        <LeftSpan>상품금액&nbsp;&nbsp;</LeftSpan>
        <RightSpan>{addComma(totalPrice)}원</RightSpan>
      </ContentsBox>
      <ContentsBox>
        <LeftSpan>배송비&nbsp;</LeftSpan>
        {totalPrice === 0 ? (
          <RightSpan> 0 원</RightSpan>
        ) : (
          <RightSpan>+ {addComma(shippingFee)} 원</RightSpan>
        )}
      </ContentsBox>
      <ContentsBox>
        <LeftSpan>할인금액&nbsp;</LeftSpan>
        {totalPrice === 0 ? (
          <RightSpan> 0 원</RightSpan>
        ) : (
          <RightSpan> - {addComma(discountAmount)} 원</RightSpan>
        )}
      </ContentsBox>
      <Amounts>
        <LeftSpan style={{ fontWeight: 900, fontSize: 20 }}>
          결제 예정금액&nbsp;
        </LeftSpan>
        <RightSpan style={{ fontWeight: 900, fontSize: 20 }}>
          {addComma(shippingFee + totalPrice - discountAmount)} 원
        </RightSpan>
      </Amounts>
    </>
  );
}

export const CartSideBar = () => {
  const AllCartItems = useSelector((state) => state.cart.cartItem);
  const checkedItems = useSelector((state) => state.cart.checkedItems);
  const navigate = useNavigate();

  const cartItems = AllCartItems.filter((item) =>
    checkedItems.includes(item.cartNum)
  );

  const isNotItems = checkedItems.length === 0;

  const clickHandler = () => {
    navigate("/order", { state: { cartItems } });
  };

  return (
    <SideBarWrap>
      <SideBarContainer>
        <SideBarContent>
          <Contents cartItems={cartItems} />
        </SideBarContent>
        <OrderButton type="button" onClick={clickHandler} disabled={isNotItems}>
          구매하기
        </OrderButton>
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
  :disabled {
    cursor: default;
  }
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
