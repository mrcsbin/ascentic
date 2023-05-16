import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setIsLogin } from "../store/modules/login";
import { getCookie } from "../utils/Cookies";
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
  Withdrawal,
} from "../pages/Pages";

function Routes() {
  const isLoggedIn = useSelector((state) => state.login.isLogin);
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

      <Route path="/goodbye" element={<Withdrawal />} />

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
