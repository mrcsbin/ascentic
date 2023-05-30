import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setIsLogin } from "../store/modules/login";
import { getCookie } from "../utils/Cookies";
import { Routes as BrowserRoutes, Route, Navigate } from "react-router-dom";
import * as Pages from "../pages/Pages";
import * as AdminPages from "../admin/pages/AdminPages";

function Routes() {
  const isLoggedIn = useSelector((state) => state.login.isLogin);
  const role = useSelector((state) => state.login.role);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkTokenExpiration = () => {
      const token = getCookie("accessToken");
      if (!token && isLoggedIn) {
        dispatch(setIsLogin(false));
        alert("세션이 만료되었습니다. 다시 로그인해주세요");
        window.location.replace("/");
      }
    };
    checkTokenExpiration();

    const interval = setInterval(() => {
      checkTokenExpiration();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [isLoggedIn]);

  return (
    <BrowserRoutes>
      <Route path="/" element={<Pages.Main />}></Route>
      <Route path="/test" element={<Pages.MainTest />}></Route>
      <Route path="/test2" element={<Pages.MainTest2 />}></Route>
      <Route path="/test3" element={<Pages.MainTest3 />}></Route>
      <Route
        path="/login"
        element={isLoggedIn ? <Navigate to="/mypage" /> : <Pages.Login />}
      />
      <Route path="/login/kakao" element={<Pages.KakaoLogin />} />
      <Route
        path="/mypage"
        element={
          isLoggedIn ? (
            role === "ADMIN" ? (
              <Navigate to="/admin" />
            ) : (
              <Pages.MyPage />
            )
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route path="/cart" element={<Pages.Cart />} />
      <Route path="/*" element={<Navigate to="/NotFound" />} />
      <Route path="/NotFound" element={<Pages.NotFound />} />
      <Route path="/member/find" element={<Pages.FindIdPw />} />
      <Route path="/signup" element={<Pages.SignUp />}></Route>
      <Route path="/signupsuccess" element={<Pages.SignUpSuccess />} />
      <Route path="/goodbye" element={<Pages.Withdrawal />} />
      <Route path="/order" element={<Pages.Order />}></Route>
      <Route path="/ordercomplete" element={<Pages.OrderComplete />} />
      <Route path="/proddetail" element={<Pages.ProdDetail />} />
      <Route
        path="/store/productdetail/:prod_num"
        element={<Pages.ProdDetail />}
      />
      <Route exact path="/storemain/" element={<Pages.StoreMain />} />
      <Route exact path="/storemain/:category" element={<Pages.StoreMain />} />
      <Route path="/exp" element={<Pages.ExpMain />} />
      <Route path="/exp/taste" element={<Pages.ExpTaste></Pages.ExpTaste>} />
      <Route path="/exp/taste/res" element={<Pages.TestResult />} />
      <Route path="/exp/subs" element={<Pages.ExpSubs />} />
      <Route path="/exp/subsmanage" element={<Pages.ExpSubsManage />} />
      <Route path="/community/event" element={<Pages.Event />} />
      <Route path="/community/event/:postId" element={<Pages.EventDetail />} />

      {/* ---------------------------------Admin pages.... ------------------------------------------*/}
      <Route path="/admin" element={<AdminPages.AdminMainPage />} />
      <Route path="/admin/analysis" element={<AdminPages.AdminAnalysis />} />
      <Route
        path="/admin/analysis/:category"
        element={<AdminPages.AdminAnalysis />}
      />
      <Route
        path="/admin/customerservice"
        element={<AdminPages.AdminCustomerService />}
      />
      <Route
        path="/admin/customerservice/:category"
        element={<AdminPages.AdminCustomerService />}
      />
      <Route path="/admin/eventnews" element={<AdminPages.AdminEventNews />} />
      <Route
        path="/admin/eventnews/:category"
        element={<AdminPages.AdminEventNews />}
      />
      <Route
        path="/admin/membermanagement"
        element={<AdminPages.AdminMemberManagement />}
      />
      <Route
        path="/admin/storemanagement"
        element={<AdminPages.AdminStoreManagement />}
      />
      <Route
        exact
        path="/admin/storemanagement/:category"
        element={<AdminPages.AdminStoreManagement />}
      ></Route>
      <Route
        path="/admin/subscribemanagement"
        element={<AdminPages.AdminSubscribeManagement />}
      />
      <Route
        path="/admin/subscribemanagement/:category"
        element={<AdminPages.AdminSubscribeManagement />}
      />
    </BrowserRoutes>
  );
}

export default Routes;
