import { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./styles/Reset.css";
import Routes from "./routes/Routes";
import Footer from "./components/common/Footer";
import Loading from "./components/common/Loading";
import Header from "./components/common/Header";
import RouteChangeTracker from "./RouteChangeTracker";
import { AdminNavToggle } from "./admin/components/AdminNavToggle";
import ScrollToTop from "./ScrollToTop";

function App() {
  return (
    <Router>
      <RouteChangeTracker />
      <AdminNavToggle />
      <Header />
      {/* lazy() 사용시 서스펜스 적용 안하면 오류발생함 */}
      <Suspense fallback={<Loading />}>
        <ScrollToTop />
        <Routes></Routes>
      </Suspense>
      <Footer />
    </Router>
  );
}

export default App;
