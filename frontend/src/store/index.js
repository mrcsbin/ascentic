import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./modules/cart";

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store;
