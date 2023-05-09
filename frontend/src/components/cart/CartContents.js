import styled from "styled-components";

function CartItemList() {
  return (
    <>
      <CartItemCard>
        <SelectBox>
          <SelectCheck type="checkbox"></SelectCheck>
        </SelectBox>
      </CartItemCard>
    </>
  );
}

export const CartContents = () => {
  return (
    <CartList>
      <CartItemList></CartItemList>
    </CartList>
  );
};

const CartList = styled.ul``;

const CartItemCard = styled.li``;

const SelectBox = styled.div``;

const SelectCheck = styled.input``;
