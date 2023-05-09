import styled from "styled-components";

function CartItemList() {
  return (
    <>
      <CartItemCard>

      </CartItemCard>
    </>
  );
}

function CartContentHeader() {
  return (
    <ContentHeaderWrap className="contentHeader-wrap">
      <ContentHeader className="contentHeader">
        <SelectLabel>
          <SelectCheck type="checkbox"></SelectCheck>
          <SelectSpan>전체선택&nbsp;&nbsp;&nbsp;&nbsp;</SelectSpan>
        </SelectLabel>
        <DeleteButton className="header-delete-button" type="button">
          선택삭제
        </DeleteButton>
      </ContentHeader>
    </ContentHeaderWrap>
  );
}

export const CartContents = () => {
  return (
    <CartContentsWrap>
      <CartContentHeader></CartContentHeader>
      <CartList>
        <CartItemList></CartItemList>
      </CartList>
    </CartContentsWrap>
  );
};

const CartContentsWrap = styled.div`
  box-sizing: border-box;
  position: relative;
  width: 100%;
  min-height: 1px;
  flex: 0 0 66.666666%;
  max-width: 66.666666%;
  padding: 0 20px;
`;

const ContentHeaderWrap = styled.div`
  box-sizing:border-box;
  display:flex;
  font-weight:600;
  align-items:center;
  justify-content-space-between;
  padding: 20px 10px 20px 0;
  border-bottom: 1.5px solid black;
`;

const ContentHeader = styled.div`
  line-height: 26px;
`;

const SelectLabel = styled.label`
  align-items: center;
  vertical-align: top;
  display: inline-flex;
`;

const SelectCheck = styled.input`
  transform: scale(1.2);
`;

const SelectSpan = styled.span`
  font-size: 16px;
  margin: 0 5px;
`;

const DeleteButton = styled.button`
  cursor: pointer;
  background-color: transparent;
  border: none;
  font-size: 16px;
  font-weight: 600;
`;

const CartList = styled.ul``;

const CartItemCard = styled.li``;

