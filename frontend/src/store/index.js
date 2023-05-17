import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./modules/cart";
import loginReducer from "./modules/login";
import myPageReducer from "./modules/mypage";
import orderReducer from "./modules/order";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    login: loginReducer,
    mypage: myPageReducer,
    order: orderReducer,
  },
});

export default store;
