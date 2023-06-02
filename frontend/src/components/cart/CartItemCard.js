import styled from "styled-components";
import {
  decreaseCount,
  increaseCount,
  removeCartItem,
  fetchCartItems,
  toggleCheckItem,
  updateCartItem,
} from "../../store/modules/cart";
import { useDispatch, useSelector } from "react-redux";

function CountButton({ cartNum, productCount }) {
  const dispatch = useDispatch();

  return (
    <CountButtonBox>
      <MinusButton
        onClick={async () => {
          dispatch(decreaseCount({ cartNum }));
          dispatch(updateCartItem({ cartNum, productCount: productCount - 1 }));
        }}
        disabled={productCount === 1}
      ></MinusButton>
      <NumCount>{productCount}</NumCount>
      <PlusButton
        onClick={async () => {
          dispatch(increaseCount({ cartNum }));
          dispatch(updateCartItem({ cartNum, productCount: productCount + 1 }));
        }}
      ></PlusButton>
    </CountButtonBox>
  );
}

function addComma(num) {
  var regexp = /\B(?=(\d{3})+(?!\d))/g;
  return num.toString().replace(regexp, ",");
}

export const CartItemCard = ({ item }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItem);
  const cartItem = cartItems.find(
    (cartItem) => cartItem.cartNum === item.cartNum
  );
  const productCount = cartItem?.productCount;

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

  return (
    <ItemCard>
      <SelectButtonBox>
        <SelectButton
          type="checkbox"
          checked={isChecked}
          onChange={handleToggleCheck}
          disabled={item.optionState === "품절"}
        />
      </SelectButtonBox>
      <ImageBox>
        <ItemImageLink href={`store/productdetail/${item.productNum}`}>
          <ItemImage
            src={`http://localhost:8080/images/${item.productImage}`}
            alt="상품 이미지"
          />
          {item.optionState === "품절" && <SoldOutText>SOLD OUT</SoldOutText>}
        </ItemImageLink>
      </ImageBox>
      <ItemBox>
        <ItemLink href={`store/productdetail/${item.productNum}`}>
          <ItemTitle>{item.productName}</ItemTitle>
          <ItemOption>{item.productOptionName}</ItemOption>
        </ItemLink>
      </ItemBox>
      <CountBox>
        <CountButton productCount={productCount} cartNum={item.cartNum} />
      </CountBox>
      <PriceBox>
        <ItemPrice>{addComma(productCount * item.productPrice)}원</ItemPrice>
      </PriceBox>
      <DeleteButtonBox>
        <DeleteButton onClick={handleDeleteClick} />
      </DeleteButtonBox>
    </ItemCard>
  );
};

// countButton
const SoldOutText = styled.div`
  position: absolute;
  width: 100%;
  top: 50%;
  text-align: center;
  font-size: 1.1rem;
  color: red;
  font-weight: 600;
`;

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

const SelectButtonBox = styled.div`
  width: 5%;
  display: flex;
  justify-content: center;
`;

const SelectButton = styled.input``;

const ImageBox = styled.div`
  position: relative;
  width: 15%;
`;

const ItemImageLink = styled.a``;

const ItemImage = styled.img`
  width: 100%;
`;

const SoldOutText = styled.div`
  position: absolute;
  width: 100%;
  top: 50%;
  text-align: center;
  font-size: 1.1rem;
  color: red;
  font-weight: 600;
`;

const ItemBox = styled.div`
  width: 50%;
  padding-left: 5%;
  box-sizing: border-box;
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

const CountBox = styled.div`
  width: 15%;
`;

const PriceBox = styled.div`
  width: 10%;
  text-align: center;
`;

const ItemPrice = styled.div`
  text-align: center;
`;

const DeleteButtonBox = styled.div`
  width: 5%;
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
