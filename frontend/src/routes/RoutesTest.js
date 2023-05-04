import {
  Main,
  Login,
  FindData,
  SignUp,
  SignUpSuccess,
  MyPage,
  StoreMain,
  ProdDetail,
  OrderComplete,
  Order,
  KakaoRedirect,
} from "../pages/Pages";

import { Route, Routes as BrowserRoutes } from "react-router-dom";

// import { BROWSER_PATH } from "../constants/path";

function RoutesTest() {
  return (
    <BrowserRoutes>
      <Route path="/" element={<Main />}></Route>

      <Route path="/login" element={<Login />}></Route>

      <Route path="/login/kakao" element={<KakaoRedirect />} />

      <Route path="/member/find" element={<FindData />} />

      <Route path="/signup" element={<SignUp />}></Route>

      <Route path="/signupsuccess" element={<SignUpSuccess />} />

      <Route path="/mypage" element={<MyPage />} />

      <Route path="/order" element={<Order />}></Route>

      <Route path="/ordercomplete" element={<OrderComplete />}></Route>

      <Route path="/proddetail" element={<ProdDetail />}></Route>

      <Route path="/storemain" element={<StoreMain />}></Route>
    </BrowserRoutes>
  );
}

export default RoutesTest;
