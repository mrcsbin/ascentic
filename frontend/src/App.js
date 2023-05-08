import { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./styles/Reset.css";
import RoutesTest from "./routes/RoutesTest";
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
        <RoutesTest></RoutesTest>
      </Suspense>
      <Footer />
    </Router>
  );
}

export default App;
