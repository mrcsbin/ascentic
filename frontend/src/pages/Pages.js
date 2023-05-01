import { lazy } from "react";

const Order = lazy(() => import("./store/Order"));
const OrderComplete = lazy(() => import("./store/OrderComplete"));
const ProdDetail = lazy(() => import("./store/ProdDetail"));
const StoreMain = lazy(() => import("./store/StoreMain"));
const LoginPage = lazy(() => import("./LoginPage"));
const MainPage = lazy(() => import("./MainPage"));
const SignUp = lazy(() => import("./SignUp"));

export {
  Order,
  OrderComplete,
  ProdDetail,
  StoreMain,
  LoginPage,
  MainPage,
  SignUp,
};
