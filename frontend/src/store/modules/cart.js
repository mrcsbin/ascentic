import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCartList, removeCart, updateCart } from "../../api/CartApi";
import { getCookie } from "../../utils/Cookies";

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async () => {
    const res = await getCartList(getCookie("accessToken"));
    return res;
  }
);

export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async (cartNum, thunkAPI) => {
    await removeCart(getCookie("accessToken"), cartNum);
  }
);

export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async ({ cartNum, productCount }, thunkAPI) => {
    await updateCart(cartNum, productCount);
  }
);

const initialState = {
  cartItem: [],
  loading: false,
  checkedItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    decreaseCount: (state, action) => {
      const { cartNum } = action.payload;
      const cartItem = state.cartItem.find((item) => item.cartNum === cartNum);
      if (cartItem) {
        cartItem.productCount--;
      }
    },
    increaseCount(state, action) {
      const { cartNum } = action.payload;
      const cartItem = state.cartItem.find((item) => item.cartNum === cartNum);
      if (cartItem) {
        cartItem.productCount++;
      }
    },
    toggleCheckItem(state, action) {
      const cartNum = action.payload;
      const isChecked = state.checkedItems.includes(cartNum);
      if (isChecked) {
        state.checkedItems = state.checkedItems.filter(
          (item) => item !== cartNum
        );
      } else {
        state.checkedItems.push(cartNum);
      }
    },
    toggleAllCheckItem(state) {
      if (state.checkedItems.length === state.cartItem.length) {
        state.checkedItems = [];
      } else {
        const allCartNum = state.cartItem.map((item) => item.cartNum);
        state.checkedItems = [...allCartNum];
      }
    },
  },
  extraReducers: {
    [fetchCartItems.pending]: (state) => {
      state.loading = true;
    },
    [fetchCartItems.fulfilled]: (state, action) => {
      state.loading = false;
      state.cartItem = action.payload;
      state.checkedItems = action.payload.map((item) => item.cartNum);
    },
  },
});

export const {
  decreaseCount,
  increaseCount,
  toggleCheckItem,
  toggleAllCheckItem,
} = cartSlice.actions;

export default cartSlice.reducer;
