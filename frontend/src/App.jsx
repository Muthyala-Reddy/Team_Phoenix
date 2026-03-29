import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import User from "./pages/User";
import UserFront from "./pages/UserFront";
import Admin from "./pages/Admin";
import AdminFront from "./pages/AdminFront";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Login pages */}
        <Route path="/login" element={<User />} />
        <Route path="/admin/login" element={<Admin />} />

        {/* Dashboards */}
        <Route path="/user" element={<UserFront />} />
        <Route path="/admin" element={<AdminFront />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
``