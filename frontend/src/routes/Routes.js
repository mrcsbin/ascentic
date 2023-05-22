// import { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { setIsLogin } from "../store/modules/login";
// import { getCookie } from "../utils/Cookies";
// import { Routes as BrowserRoutes, Route, Navigate } from "react-router-dom";
// import * as Pages from "../pages/Pages";
// import * as AdminPages from "../admin/components/AdminPages";

// function Routes() {
//   const isLoggedIn = useSelector((state) => state.login.isLogin);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const checkTokenExpiration = () => {
//       const token = getCookie("accessToken");
//       if (!token && isLoggedIn) {
//         dispatch(setIsLogin(false));
//         alert("세션이 만료되었습니다. 다시 로그인해주세요");
//         window.location.replace("/");
//       }
//     };
//     checkTokenExpiration();

//     const interval = setInterval(() => {
//       checkTokenExpiration();
//     }, 1000);

//     return () => {
//       clearInterval(interval);
//     };
//   }, [isLoggedIn]);

//   return (
//     <BrowserRoutes>
//       <Route path="/" element={<Pages.Main />}></Route>

//       <Route
//         path="/login"
//         element={isLoggedIn ? <Navigate to="/mypage" /> : <Pages.Login />}
//       />

//       <Route path="/login/kakao" element={<Pages.KakaoLogin />} />

//       <Route
//         path="/mypage"
//         element={isLoggedIn ? <Pages.MyPage /> : <Navigate to="/login" />}
//       />

//       <Route path="/cart" element={<Pages.Cart />} />
//       <Route path="/*" element={<Navigate to="/NotFound" />} />
//       <Route path="/NotFound" element={<Pages.NotFound />} />
//       <Route path="/member/find" element={<Pages.FindIdPw />} />
//       <Route path="/signup" element={<Pages.SignUp />}></Route>
//       <Route path="/signupsuccess" element={<Pages.SignUpSuccess />} />
//       <Route
//         path="/mypage"
//         element={isLoggedIn ? <Pages.MyPage /> : <Navigate to="/login" />}
//       />
//       <Route path="/cart" element={<Pages.Cart />} />
//       <Route path="/*" element={<Navigate to="/NotFound" />} />
//       <Route path="/NotFound" element={<Pages.NotFound />} />
//       <Route path="/member/find" element={<Pages.FindIdPw />} />
//       <Route path="/signup" element={<Pages.SignUp />}></Route>
//       <Route path="/signupsuccess" element={<Pages.SignUpSuccess />} />

//       <Route path="/goodbye" element={<Pages.Withdrawal />} />

//       <Route path="/order" element={<Pages.Order />}></Route>
//       <Route path="/ordercomplete" element={<Pages.OrderComplete />}></Route>
//       <Route path="/proddetail" element={<Pages.ProdDetail />}></Route>
//       <Route path="/storemain" element={<Pages.StoreMain />}></Route>
//       <Route
//         exact
//         path="/storemain/:category"
//         element={<Pages.StoreMain />}
//       ></Route>

//       <Route
//         path="/store/productdetail/:prod_num"
//         element={<Pages.ProdDetail />}
//       ></Route>

//       <Route path="/exp" element={<Pages.ExpMain></Pages.ExpMain>}></Route>

//       <Route path="/exp/taste" element={<Pages.ExpTaste></Pages.ExpTaste>}></Route>

//       <Route path="/exp/subs" element={<Pages.ExpSubs></Pages.ExpSubs>}></Route>

//       <Route
//         path="/exp/subsmanage"
//         element={<Pages.ExpSubsManage></Pages.ExpSubsManage>}
//       ></Route>

//       <Route
//         path="/store/productdetail/:prod_num"
//         element={<Pages.ProdDetail />}
//       ></Route>
//       {/* ---------------------------------Admin pages.... ------------------------------------------*/}
//       <Route path="/admin" element={<AdminPages.Admin />} />

//       <Route path="/admin/analysis" element={<AdminPages.AdminAnalysis />} />
//       <Route
//         path="/admin/customerservice"
//         element={<AdminPages.AdminCustomerService />}
//       />
//       <Route path="/admin/eventnews" element={<AdminPages.AdminEventNews />} />
//       <Route
//         path="/admin/membermanagement"
//         element={<AdminPages.AdminMemberManagement />}
//       />
//       <Route
//         path="/admin/storemanagement"
//         element={<AdminPages.AdminStoreManagement />}
//       />
//       <Route
//         path="/admin/subscribemanagement"
//         element={<AdminPages.AdminSubscribeManagement />}
//       />
//     </BrowserRoutes>
//   );
// }

// export default Routes;

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setIsLogin } from "../store/modules/login";
import { getCookie } from "../utils/Cookies";
import { Routes as BrowserRoutes, Route, Navigate } from "react-router-dom";
import * as Pages from "../pages/Pages";
import * as AdminPages from "../admin/components/AdminPages";

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
      <Route path="/ordercomplete" element={<Pages.OrderComplete />}></Route>
      <Route path="/proddetail" element={<Pages.ProdDetail />}></Route>
      <Route exact path="/storemain/" element={<Pages.StoreMain />}></Route>
      <Route
        exact
        path="/storemain/:category"
        element={<Pages.StoreMain />}
      ></Route>

      <Route
        path="/store/productdetail/:prod_num"
        element={<Pages.ProdDetail />}
      ></Route>

      <Route path="/exp" element={<Pages.ExpMain></Pages.ExpMain>}></Route>

      <Route
        path="/exp/taste"
        element={<Pages.ExpTaste></Pages.ExpTaste>}
      ></Route>
      <Route
        path="/exp/taste/res"
        element={<Pages.TestResult></Pages.TestResult>}
      ></Route>
      <Route path="/exp/subs" element={<Pages.ExpSubs></Pages.ExpSubs>}></Route>

      <Route
        path="/exp/subsmanage"
        element={<Pages.ExpSubsManage></Pages.ExpSubsManage>}
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
