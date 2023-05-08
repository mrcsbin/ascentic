import { lazy } from "react";

const Order = lazy(() => import("./store/Order"));
const OrderComplete = lazy(() => import("./store/OrderComplete"));
const ProdDetail = lazy(() => import("./store/ProdDetail"));
const StoreMain = lazy(() => import("./store/StoreMain"));
const Login = lazy(() => import("./Login"));
const KakaoLogin = lazy(() => import("../components/login/KakaoLogin"));
const FindData = lazy(() => import("./FindData"));
const Main = lazy(() => import("./Main"));
const SignUp = lazy(() => import("./SignUp"));
const SignUpSuccess = lazy(() => import("./SignUpSuccess"));
const MyPage = lazy(() => import("./MyPage"));
const NotFound = lazy(() => import("./NotFound"));
export {
  Order,
  OrderComplete,
  ProdDetail,
  StoreMain,
  Login,
  KakaoLogin,
  FindData,
  Main,
  SignUp,
  SignUpSuccess,
  MyPage,
  NotFound,
};
