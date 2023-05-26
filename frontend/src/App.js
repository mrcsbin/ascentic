import { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./styles/Reset.css";
import Routes from "./routes/Routes";
import Footer from "./components/common/Footer";
import Loading from "./components/common/Loading";
import AdminNav from "./admin/components/AdminNav";
import Header from "./components/common/Header";
import RouteChangeTracker from "./RouteChangeTracker";

function App() {

  return (
    <Router>
      <RouteChangeTracker />
       <AdminNav />
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
