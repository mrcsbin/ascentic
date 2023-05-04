import { lazy } from "react";

const Order = lazy(() => import("./store/Order"));
const OrderComplete = lazy(() => import("./store/OrderComplete"));
const ProdDetail = lazy(() => import("./store/ProdDetail"));
const StoreMain = lazy(() => import("./store/StoreMain"));
const Login = lazy(() => import("./Login"));
const KakaoRedirect = lazy(() => import("../components/login/KakaoRedirect"));
const FindData = lazy(() => import("./FindData"));
const Main = lazy(() => import("./Main"));
const SignUp = lazy(() => import("./SignUp"));
const SignUpSuccess = lazy(() => import("./SignUpSuccess"));
const MyPage = lazy(() => import("./MyPage"));

export {
  Order,
  OrderComplete,
  ProdDetail,
  StoreMain,
  Login,
  KakaoRedirect,
  FindData,
  Main,
  SignUp,
  SignUpSuccess,
  MyPage,
};
