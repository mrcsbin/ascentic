// import MainPage from "./pages/MainPage";
import { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./styles/Reset.css";
import RoutesTest from "./routes/RoutesTest";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Notice from "./components/common/Notice";
import Loading from "./components/common/Loading";

// import Login from "./pages/LoginPage";
// import SignUp from "./pages/SignUp";
// import Order from "./pages/store/Order";
// import OrderComplete from "./pages/store/OrderComplete";
// import ProdDetail from "./pages/store/ProdDetail";
// import StoreMain from "./pages/store/StoreMain";

function App() {
  return (
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<MainPage />}></Route>
    //     <Route path="/login" element={<Login />}></Route>
    //     <Route path="/Signup" element={<SignUp />}></Route>
    //     <Route path="/Order" element={<Order />}></Route>
    //     <Route path="/OrderComplete" element={<OrderComplete />}></Route>
    //     <Route path="/ProdDetail" element={<ProdDetail />}></Route>
    //     <Route path="/StoreMain" element={<StoreMain />}></Route>
    //   </Routes>
    // </Router>
    <Router>
      <Notice />
      <Header />
      {/* lazy() 사용시 서스펜스 적용 안하면 오류발생함 */}
      <Suspense fallback={<Loading />}>
        <RoutesTest></RoutesTest>
      </Suspense>
      <Footer />
    </Router>
  );
}

export default App;
