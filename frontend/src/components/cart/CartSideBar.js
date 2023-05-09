import styled from "styled-components";

function Content() {
  return (
    <>
      <가격정보박스>
        <span>상품금액&nbsp;&nbsp;</span>
        <span>10,000 원</span>
      </가격정보박스>
      <가격정보박스>
        <span>배송비&nbsp;</span>
        <span>+ 3,000 원</span>
      </가격정보박스>
      <가격정보박스>
        <span>할인금액(?)&nbsp;</span>
        <span>- 1,000 원</span>
      </가격정보박스>
      <가격정보박스>
        <span>총 결제금액&nbsp;</span>
        <span>12,000 원</span>
      </가격정보박스>
    </>
  );
}

export const CartSideBar = () => {
  return (
    <SideBarWrap>
      <SideBarContainer>
        <SideBarContent>
          <Content />
        </SideBarContent>
        <SideBarOrder>
          <OrderButton type="button"> 구매하기</OrderButton>
        </SideBarOrder>
      </SideBarContainer>
    </SideBarWrap>
  );
};

const SideBarWrap = styled.div`
  box-sizing: border-box;
  position: relative;
  width: 100%;
  min-height: 1px;
  flex: 0 0 33.33333%;
  max-width: 33.333333%;
  padding: 35px 10px 0 10px;
`;

const SideBarContainer = styled.div``;

const SideBarContent = styled.div``;

const SideBarOrder = styled.div``;

const OrderButton = styled.button``;

const 가격정보박스 = styled.div``;