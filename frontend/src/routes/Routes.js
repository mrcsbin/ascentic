import { Route, Routes as BrowserRoutes, Navigate } from 'react-router-dom';

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
} from '../pages/Pages';

function Routes() {
  return (
    <BrowserRoutes>
      <Route path="/" element={<Main />}></Route>

      <Route path="/login" element={<Login />}></Route>
      <Route path="/*" element={<Navigate to="/NotFound" />} />
      <Route path="/NotFound" element={<NotFound />} />
      <Route path="/login/kakao" element={<KakaoLogin />} />

      <Route path="/member/find" element={<FindIdPw />} />

      <Route path="/signup" element={<SignUp />}></Route>

      <Route path="/signupsuccess" element={<SignUpSuccess />} />

      <Route path="/mypage" element={<MyPage />} />

      <Route path="/order" element={<Order />}></Route>

      <Route path="/ordercomplete" element={<OrderComplete />}></Route>

      <Route path="/proddetail" element={<ProdDetail />}></Route>

      <Route path="/storemain" element={<StoreMain />}></Route>

      <Route exact path="/storemain/:category" element={<StoreMain />}></Route>

      <Route
        path="/store/productdetail/:prod_num"
        element={<ProdDetail />}
      ></Route>
    </BrowserRoutes>
  );
}

export default Routes;
