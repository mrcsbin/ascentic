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
const ExpMain = lazy(() => import("./experience/ExpMain"));
const ExpSubs = lazy(() => import("./experience/ExpSubs"));
const ExpSubsManage = lazy(() => import("./experience/ExpSubsManage"));
const ExpTaste = lazy(() => import("./experience/ExpTaste"));
const TestResult = lazy(() => import("./experience/ExpTasteRes"));
const Withdrawal = lazy(() => import("./Withdrawal"));
const Event = lazy(() => import("./community/Event"));
const EventDetail = lazy(() => import("./community/EventDetail"));
const ProdDetailV2 = lazy(() => import("./store/ProdDetailV2"));
const MainTest = lazy(() => import("./MainTest"));
const MainTest2 = lazy(() => import("./MainTest2"));
const MainTest3 = lazy(() => import("./MainTest3"));

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
  ExpMain,
  ExpSubs,
  ExpSubsManage,
  ExpTaste,
  TestResult,
  Withdrawal,
  Event,
  EventDetail,
  ProdDetailV2,
  MainTest,
  MainTest2,
  MainTest3,
};
