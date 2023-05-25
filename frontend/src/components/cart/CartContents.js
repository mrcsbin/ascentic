import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { CartItemCard } from "./CartItemCard";
import { updateCartItem } from "../../store/modules/cart";
import {
  removeCartItem,
  fetchCartItems,
  toggleAllCheckItem,
} from "../../store/modules/cart";
import { useEffect } from "react";

function CartContentHeader() {
  const cartItems = useSelector((state) => state.cart.cartItem);
  const checkedItems = useSelector((state) => state.cart.checkedItems);
  const dispatch = useDispatch();

  const isAllChecked = cartItems.every((item) =>
    checkedItems.includes(item.cartNum)
  );

  useEffect(() => {
    dispatch(updateCartItem(cartItems));
  }, [cartItems, dispatch]);

  const handleDeleteClick = () => {
    checkedItems.forEach((cartNum) => {
      dispatch(removeCartItem(cartNum)).then(() => dispatch(fetchCartItems()));
    });
  };

  const handleChange = () => {
    dispatch(toggleAllCheckItem());
  };

  return (
    <ContentHeaderWrap className="contentHeader-wrap">
      <ContentHeader className="contentHeader">
        <SelectLabel>
          <SelectCheck
            type="checkbox"
            checked={isAllChecked}
            onChange={handleChange}
          ></SelectCheck>
          <SelectSpan>전체선택&nbsp;&nbsp;&nbsp;&nbsp;</SelectSpan>
        </SelectLabel>
        <DeleteButton
          className="header-delete-button"
          type="button"
          onClick={handleDeleteClick}
        >
          선택삭제
        </DeleteButton>
      </ContentHeader>
    </ContentHeaderWrap>
  );
}

export const CartContents = () => {
  const cartItems = useSelector((state) => state.cart.cartItem);
  return (
    <CartContentsWrap>
      <CartContentHeader />
      <CartContentBody>
        {cartItems.map((item, index) => (
          <CartItemCard key={index} item={item} />
        ))}
      </CartContentBody>
    </CartContentsWrap>
  );
};

// CartContentHeader
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

// CartContents
const CartContentBody = styled.ul`
  border-bottom: 1px solid black;
`;

const CartContentsWrap = styled.div`
  box-sizing: border-box;
  position: relative;
  width: 100%;
  min-height: 1px;
  flex: 0 0 66.666666%;
  max-width: 66.666666%;
  padding: 0 20px;
`;
