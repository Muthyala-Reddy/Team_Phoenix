import { useState } from 'react'
import React from 'react'
import './App.css'
import Home from './pages/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import User from './pages/User';
import Admin from './pages/Admin';
import AdminFront from './pages/AdminFront';
import UserFront from './pages/UserFront';
import SubmittedPage from './pages/SubmittedPage';
import AllotedPage from './pages/AllotedPage';
import UpdateTicket from './pages/UpdateTicket';
import DeleteTicket from './pages/DeleteTicket';
import InProgressPage from './pages/InProgressPage';


function App() {
  const [count, setCount] = useState(0)

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

            <Route path="/Admin/AdminFront/AllotedPage/UpdateTicket" element={<UpdateTicket />} />
            <Route path="/Admin/AdminFront/AllotedPage/DeleteTicket" element={<DeleteTicket />} />

            
            
          </Routes>
      </BrowserRouter>
        
    </>
  );
}

export default App
