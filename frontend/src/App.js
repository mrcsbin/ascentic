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
  const [isLoggedIn, setIsLoggedIn] = useState(!!getCookie("accessToken"));

  useEffect(() => {
    const checkTokenExpiration = () => {
      const token = getCookie("accessToken");
      if (!token && isLoggedIn) {
        setIsLoggedIn(false);
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
    <Router>
      <Notice />
      <Header />
      {/* lazy() 사용시 서스펜스 적용 안하면 오류발생함 */}
      <Suspense fallback={<Loading />}>
        <Routes isLoggedIn={isLoggedIn}></Routes>
      </Suspense>
      <Footer />
    </Router>
  );
}

export default App;
