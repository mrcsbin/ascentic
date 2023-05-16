import { Routes as BrowserRoutes, Route, Navigate } from "react-router-dom";
import * as Pages from "../pages/Pages";
import * as AdminPages from "../admin/components/AdminPages";
function Routes({ isLoggedIn }) {
  return (
    <BrowserRoutes>
      <Route path="/" element={<Pages.Main />}></Route>

      <Route
        path="/login"
        element={isLoggedIn ? <Navigate to="/mypage" /> : <Pages.Login />}
      />

      <Route path="/login/kakao" element={<Pages.KakaoLogin />} />

      <Route
        path="/mypage"
        element={isLoggedIn ? <Pages.MyPage /> : <Navigate to="/login" />}
      />

      <Route path="/cart" element={<Pages.Cart />} />
      <Route path="/*" element={<Navigate to="/NotFound" />} />
      <Route path="/NotFound" element={<Pages.NotFound />} />
      <Route path="/member/find" element={<Pages.FindIdPw />} />
      <Route path="/signup" element={<Pages.SignUp />}></Route>
      <Route path="/signupsuccess" element={<Pages.SignUpSuccess />} />
      <Route path="/order" element={<Pages.Order />}></Route>
      <Route path="/ordercomplete" element={<Pages.OrderComplete />}></Route>
      <Route path="/proddetail" element={<Pages.ProdDetail />}></Route>
      <Route path="/storemain" element={<Pages.StoreMain />}></Route>
      <Route
        exact
        path="/storemain/:category"
        element={<Pages.StoreMain />}
      ></Route>

      <Route
        path="/store/productdetail/:prod_num"
        element={<Pages.ProdDetail />}
      ></Route>
      {/* ---------------------------------Admin pages.... ------------------------------------------*/}
      <Route path="/admin" element={<AdminPages.Admin />} />

      <Route path="/admin/analysis" element={<AdminPages.AdminAnalysis />} />
      <Route
        path="/admin/customerservice"
        element={<AdminPages.AdminCustomerService />}
      />
      <Route path="/admin/eventnews" element={<AdminPages.AdminEventNews />} />
      <Route
        path="/admin/membermanagement"
        element={<AdminPages.AdminMemberManagement />}
      />
      <Route
        path="/admin/storemanagement"
        element={<AdminPages.AdminStoreManagement />}
      />
      <Route
        path="/admin/subscribemanagement"
        element={<AdminPages.AdminSubscribeManagement />}
      />
    </BrowserRoutes>
  );
}

export default Routes;
