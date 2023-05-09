import { Routes as BrowserRoutes, Route, Navigate } from "react-router-dom";
import { Main, NotFound, Admin } from "../pages/Pages";

function AdminRoutes() {
  return (
    <BrowserRoutes>
      <Route path="/" element={<Main />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/*" element={<Navigate to="/NotFound" />} />
      <Route path="/NotFound" element={<NotFound />} />
    </BrowserRoutes>
  );
}

export default AdminRoutes;
