import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import User from "./pages/User";
import Admin from "./pages/Admin";
import UserFront from "./pages/UserFront";
import AdminFront from "./pages/AdminFront";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<User />} />
        <Route path="/admin/login" element={<Admin />} />
        <Route path="/user" element={<UserFront />} />
        <Route path="/admin" element={<AdminFront />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
