import { lazy } from "react";

const Order = lazy(() => import("./store/Order"));
const OrderComplete = lazy(() => import("./store/OrderComplete"));
const ProdDetail = lazy(() => import("./store/ProdDetail"));
const StoreMain = lazy(() => import("./store/StoreMain"));
const Login = lazy(() => import("./Login"));
const KakaoLogin = lazy(() => import("../components/login/KakaoLogin"));
const FindIdPw = lazy(() => import("./FindIdPw"));
const Main = lazy(() => import("./Main"));
const SignUp = lazy(() => import("./SignUp"));
const SignUpSuccess = lazy(() => import("./SignUpSuccess"));
const MyPage = lazy(() => import("./MyPage"));
const NotFound = lazy(() => import("../components/common/NotFound"));
const Cart = lazy(() => import("./Cart"));
const Admin = lazy(() => import("../admin/Admin"));

export {
  Order,
  OrderComplete,
  ProdDetail,
  StoreMain,
  Login,
  KakaoLogin,
  FindIdPw,
  Main,
  SignUp,
  SignUpSuccess,
  MyPage,
  NotFound,
  Cart,
  Admin,
};
