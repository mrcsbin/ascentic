import { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { getCookie } from "./utils/Cookies";
import { useState, useEffect } from "react";
import "./styles/Reset.css";
import Routes from "./routes/Routes";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Notice from "./components/common/Notice";
import Loading from "./components/common/Loading";

function App() {
  return (
    <Router>
      <Notice />
      <Header />
      {/* lazy() 사용시 서스펜스 적용 안하면 오류발생함 */}
      <Suspense fallback={<Loading />}>
        <Routes></Routes>
      </Suspense>
      <Footer />
    </Router>
  );
}

export default App;
