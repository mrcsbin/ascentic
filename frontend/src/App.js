// import MainPage from "./pages/MainPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./styles/Reset.css";
import RoutesTest from "./routes/RoutesTest";
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
      <RoutesTest></RoutesTest>
    </Router>
  );
}

export default App;
