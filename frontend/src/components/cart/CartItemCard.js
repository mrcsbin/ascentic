import styled from "styled-components";
import TEST_IMAGE from "../../assets/correct.png";
import {
  decreaseCount,
  increaseCount,
  removeCartItem,
  fetchCartItems,
  toggleCheckItem,
} from "../../store/modules/cart";
import { useDispatch, useSelector } from "react-redux";

function CountButton({ prodCount, cartNum }) {
  const dispatch = useDispatch();

  return (
    <CountButtonBox>
      <MinusButton
        onClick={() => {
          dispatch(decreaseCount({ cartNum }));
        }}
        disabled={prodCount === 1}
      ></MinusButton>
      <NumCount>{prodCount}</NumCount>
      <PlusButton
        onClick={() => {
          dispatch(increaseCount({ cartNum }));
        }}
      ></PlusButton>
    </CountButtonBox>
  );
}

export const CartItemCard = ({ item }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItem);
  const cartItem = cartItems.find(
    (cartItem) => cartItem.cartNum === item.cartNum
  );
  const prodCount = cartItem?.prodCount;

  const isChecked = useSelector((state) =>
    state.cart.checkedItems.includes(item.cartNum)
  );

  const handleToggleCheck = () => {
    dispatch(toggleCheckItem(item.cartNum));
  };

  const handleDeleteClick = () => {
    dispatch(removeCartItem(item.cartNum)).then(() =>
      dispatch(fetchCartItems())
    );
  };

  // "OMG 상품 번호도 받아와야됨 ..............."
  return (
    <ItemCard>
      <SelectButton
        type="checkbox"
        checked={isChecked}
        onChange={handleToggleCheck}
      />
      <ItemImageLink href={`store/productdetail/${item.prodNum}`}>
        <ItemImage src={TEST_IMAGE} alt="상품 이미지" />
      </ItemImageLink>
      <ItemLink href={`store/productdetail/${item.prodNum}`}>
        <ItemTitle>{item.prodName}</ItemTitle>
        <ItemOption>{item.prodOption}</ItemOption>
      </ItemLink>
      <CountButton prodCount={prodCount} cartNum={item.cartNum} />
      <ItemPrice>{prodCount * item.prodPrice}</ItemPrice>
      <DeleteButton onClick={handleDeleteClick} />
    </ItemCard>
  );
};

// countButton
const CountButtonBox = styled.div`
  display: inline-flex;
  align-items: center;
  border: 1px solid grey;
  width: 88px;
  border-radius: 3px;
`;

const MinusButton = styled.button`
  width: 28px;
  height: 28px;
  border: none;
  font-size: 1px;
  background-size: cover;
  background-color: transparent;
  background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAzMCAzMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0yMCAxNHYySDEwdi0yeiIgZmlsbD0iIzMzMyIgZmlsbC1ydWxlPSJub256ZXJvIi8+Cjwvc3ZnPgo=);
  cursor: pointer;
  &:disabled {
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAzMCAzMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0yMCAxNHYySDEwdi0yeiIgZmlsbD0iI0RERCIgZmlsbC1ydWxlPSJub256ZXJvIi8+Cjwvc3ZnPgo=);
    cursor: default;
  }
`;

const NumCount = styled.div`
  font-size: 14px;
  font-weight: 400;
  text-align: center;
  width: 31px;
  height: 28px;
  line-height: 30px;
`;
const PlusButton = styled.button`
  width: 28px;
  height: 28px;
  border: none;
  font-size: 1px;
  background-size: cover;
  background-color: transparent;
  background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAzMCAzMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0xNiAxMHY0aDR2MmgtNHY0aC0ydi00aC00di0yaDR2LTRoMnoiIGZpbGw9IiMzMzMiIGZpbGwtcnVsZT0ibm9uemVybyIvPgo8L3N2Zz4K);
  cursor: pointer;
`;

// CartItemCard
const ItemCard = styled.li`
  display: flex;
  align-items: center;
  padding: 20px 0px;
  border-bottom: 0.5px solid grey;
`;

const SelectButton = styled.input`
  margin: 0 10px;
`;

const ItemImageLink = styled.a`
  width: 60px;
  height: 60px;
  margin: 0 30px 0 10px;
`;

const ItemImage = styled.img`
  height: 100%;
`;

const ItemLink = styled.a`
  width: 250px;
  margin-right: 20px;
  text-decoration: none;
  color: black;
`;

const ItemTitle = styled.p`
  cursor: pointer;
  padding-top: 8px;
  font-weight: 500;
  font-size: 17px;
  line-height: 20px;
`;

const ItemOption = styled.p`
  cursor: pointer;
  margin-top: 8px;
  font-size: 13px;
  line-height: 19px;
  color: grey;
`;

const ItemPrice = styled.div`
  width: 100px;
  text-align: right;
  margin-right: 20px;
`;

const DeleteButton = styled.button`
  width: 30px;
  height: 30px;
  overflow: visible;
  background-color: white;
  background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAzMCAzMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0yMSA5Ljc2MiAyMC4yMzggOSAxNSAxNC4yMzggOS43NjIgOSA5IDkuNzYyIDE0LjIzOCAxNSA5IDIwLjIzOGwuNzYyLjc2MkwxNSAxNS43NjIgMjAuMjM4IDIxbC43NjItLjc2MkwxNS43NjIgMTV6IiBmaWxsPSIjQ0NDIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4KPC9zdmc+Cg==);
  background-size: cover;
  background-position: center center;
  border: 0;
  cursor: pointer;
`;
