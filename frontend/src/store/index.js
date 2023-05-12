import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./modules/cart";
import loginReducer from "./modules/login";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    login: loginReducer,
  },
});

export default store;
