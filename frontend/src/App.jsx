import { useState } from 'react'
import React from 'react'
import './App.css'
import LoginPage from './assets/pages/Loginpage'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import User from './assets/pages/User';
import Admin from './assets/pages/Admin';
import AdminFront from './assets/pages/AdminFront';
import UserFront from './assets/pages/UserFront';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage/>}></Route>
            <Route path="/User" element={<User/>}></Route>
            <Route path="/Admin" element={<Admin/>}></Route>
            <Route path="/AdminFront" element={<AdminFront/>}></Route>
            <Route path="/Userfront" element={<UserFront />} ></Route>
            
            
          </Routes>
      </BrowserRouter>
        
    </>
  );
}

export default App
