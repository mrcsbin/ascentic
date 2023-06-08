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
  }, [isLoggedIn, dispatch]);

  return (
    <BrowserRoutes>
      <Route path="/" element={<Pages.Main />} />
      <Route
        path="/login/"
        element={isLoggedIn ? <Navigate to="/" /> : <Pages.Login />}
      />
      <Route
        path="/login/kakao"
        element={isLoggedIn ? <Navigate to="/" /> : <Pages.KakaoLogin />}
      />
      <Route
        path="/login/find_id"
        element={isLoggedIn ? <Navigate to="/" /> : <Pages.FindId />}
      />
      <Route
        path="/login/find_password"
        element={isLoggedIn ? <Navigate to="/" /> : <Pages.FindPassword />}
      />
      {/* <Route
        path="/mypage/*"
        element={
          isLoggedIn &&
          (role === "ADMIN" ? <Navigate to="/admin" /> : <Pages.MyPage />)
        }
      /> */}
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
      <Route
        path="/mypage/:category"
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
      <Route
        path="/cart"
        element={isLoggedIn ? <Pages.Cart /> : <Navigate to="/login" />}
      />
      <Route path="/*" element={<Navigate to="/NotFound" />} />
      <Route path="/NotFound" element={<Pages.NotFound />} />
      <Route
        path="/signup"
        element={isLoggedIn ? <Navigate to="/" /> : <Pages.SignUp />}
      />
      <Route path="/signupsuccess" element={<Pages.SignUpSuccess />} />
      <Route path="/goodbye" element={<Pages.Withdrawal />} />
      <Route
        path="/order"
        element={isLoggedIn ? <Pages.Order /> : <Navigate to="/" />}
      />
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
      <Route path="/community/notice" element={<Pages.Notice />} />

      {/* ---------------------------------Admin pages.... ------------------------------------------*/}
      <Route
        path="/admin"
        element={
          role === "ADMIN" ? <AdminPages.AdminMainPage /> : <Navigate to="/" />
        }
      />
      <Route
        path="/admin/analysis"
        element={
          role === "ADMIN" ? <AdminPages.AdminAnalysis /> : <Navigate to="/" />
        }
      />
      <Route
        path="/admin/analysis/:category"
        element={
          role === "ADMIN" ? <AdminPages.AdminAnalysis /> : <Navigate to="/" />
        }
      />
      <Route
        path="/admin/customerservice"
        element={
          role === "ADMIN" ? (
            <AdminPages.AdminCustomerService />
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route
        path="/admin/customerservice/:category"
        element={
          role === "ADMIN" ? (
            <AdminPages.AdminCustomerService />
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route
        path="/admin/eventnews"
        element={
          role === "ADMIN" ? <AdminPages.AdminEventNews /> : <Navigate to="/" />
        }
      />
      <Route
        path="/admin/eventnews/:category"
        element={
          role === "ADMIN" ? <AdminPages.AdminEventNews /> : <Navigate to="/" />
        }
      />
      <Route
        path="/admin/membermanagement"
        element={
          role === "ADMIN" ? (
            <AdminPages.AdminMemberManagement />
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route
        exact
        path="/admin/storemanagement/:category"
        element={
          role === "ADMIN" ? (
            <AdminPages.AdminStoreManagement />
          ) : (
            <Navigate to="/" />
          )
        }
      ></Route>
      <Route
        path="/admin/subscribemanagement"
        element={
          role === "ADMIN" ? (
            <AdminPages.AdminSubscribeManagement />
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route
        path="/admin/subscribemanagement/:category"
        element={
          role === "ADMIN" ? (
            <AdminPages.AdminSubscribeManagement />
          ) : (
            <Navigate to="/" />
          )
        }
      />
    </BrowserRoutes>
  );
}

export default Routes;
