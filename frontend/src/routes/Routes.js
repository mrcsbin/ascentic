import { Routes as BrowserRoutes, Route, Navigate } from "react-router-dom";

import {
  Main,
  Login,
  FindIdPw,
  KakaoLogin,
  SignUp,
  SignUpSuccess,
  MyPage,
  StoreMain,
  ProdDetail,
  OrderComplete,
  Order,
  NotFound,
  Cart,
} from "../pages/Pages";

function Routes() {
  return (
    <BrowserRoutes>
      <Route path="/" element={<Main />}></Route>

      {/* <Route
        path={isLoggedIn ? "/mypage" : "/login"}
        element={isLoggedIn ? <MyPage /> : <Login />}
      /> */}

      <Route path="/login" element={<Login />} />

      <Route path="/login/kakao" element={<KakaoLogin />} />

      <Route path="/mypage" element={<MyPage />} />

      <Route path="/cart" element={<Cart />} />

      <Route path="/*" element={<Navigate to="/NotFound" />} />

      <Route path="/NotFound" element={<NotFound />} />

      <Route path="/member/find" element={<FindIdPw />} />

      <Route path="/signup" element={<SignUp />}></Route>

      <Route path="/signupsuccess" element={<SignUpSuccess />} />

      <Route path="/order" element={<Order />}></Route>

      <Route path="/ordercomplete" element={<OrderComplete />}></Route>

      <Route path="/proddetail" element={<ProdDetail />}></Route>

      <Route path="/storemain" element={<StoreMain />}></Route>
      
    </BrowserRoutes>
  );
}

export default Routes;
