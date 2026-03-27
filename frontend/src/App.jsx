import { useState } from 'react'
import React from 'react'
import './App.css'
import Home from './assets/pages/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import User from './assets/pages/User';
import Admin from './assets/pages/Admin';
import AdminFront from './assets/pages/AdminFront';
import UserFront from './assets/pages/UserFront';
import SubmittedPage from './assets/pages/SubmittedPage';
import AllotedPage from './assets/pages/AllotedPage';

import InProgressPage from './assets/pages/InProgressPage';


function App() {
  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/User" element={<User/>}></Route>
            <Route path="/Admin" element={<Admin/>}></Route>
            <Route path="/Admin/AdminFront" element={<AdminFront/>}></Route>
            <Route path="/User/Userfront" element={<UserFront />} ></Route>
            
            <Route path="/Admin/AdminFront/SubmittedPage" element={<SubmittedPage/>} />
            <Route path="/Admin/AdminFront/AllotedPage" element={<AllotedPage />} />
            <Route path="/Admin/AdminFront/InProgressPage" element={<InProgressPage />} />

            
            
          </Routes>
      </BrowserRouter>
        
    </>
  );
}

export default App
