import { Routes as BrowserRoutes, Route, Navigate } from 'react-router-dom';

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
  ExpMain,
  ExpSubs,
  ExpSubsManage,
  ExpTaste,
} from '../pages/Pages';

function Routes({ isLoggedIn }) {
  return (
    <BrowserRoutes>
      <Route path="/" element={<Main />}></Route>

      <Route
        path="/login"
        element={isLoggedIn ? <Navigate to="/mypage" /> : <Login />}
      />

      <Route path="/login/kakao" element={<KakaoLogin />} />

      <Route
        path="/mypage"
        element={isLoggedIn ? <MyPage /> : <Navigate to="/login" />}
      />

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

      <Route exact path="/storemain/:category" element={<StoreMain />}></Route>

      <Route
        path="/store/productdetail/:prod_num"
        element={<ProdDetail />}
      ></Route>

      <Route path="/exp" element={<ExpMain></ExpMain>}></Route>

      <Route path="/exp/taste" element={<ExpTaste></ExpTaste>}></Route>

      <Route path="/exp/subs" element={<ExpSubs></ExpSubs>}></Route>

      <Route
        path="/exp/subsmanage"
        element={<ExpSubsManage></ExpSubsManage>}
      ></Route>
    </BrowserRoutes>
  );
}

export default Routes;
