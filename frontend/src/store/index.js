import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./modules/cart";
import loginReducer from "./modules/login";
import myPageReducer from "./modules/mypage";


const store = configureStore({
  reducer: {
    cart: cartReducer,
    login: loginReducer,
    mypage: myPageReducer,
  },
});

export default store;
