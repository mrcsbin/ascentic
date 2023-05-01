import {
  MainPage,
  LoginPage,
  SignUp,
  StoreMain,
  ProdDetail,
  OrderComplete,
  Order,
} from "../pages/Pages";

import { Route, Routes as BrowserRoutes } from "react-router-dom";

// import { BROWSER_PATH } from "../constants/path";

function RoutesTest() {
  return (
    <BrowserRoutes>
      <Route path="/" element={<MainPage />}></Route>

      <Route path="/login" element={<LoginPage />}></Route>

      <Route path="/signup" element={<SignUp />}></Route>

      <Route path="/order" element={<Order />}></Route>

      <Route path="/ordercomplete" element={<OrderComplete />}></Route>

      <Route path="/proddetail" element={<ProdDetail />}></Route>

      <Route path="/storemain" element={<StoreMain />}></Route>
    </BrowserRoutes>
  );
}

export default RoutesTest;
