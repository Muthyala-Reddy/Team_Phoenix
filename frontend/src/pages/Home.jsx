import React from "react";
import { useNavigate } from "react-router-dom";
import '../styles/Users.css'; 
import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
  const navigate = useNavigate();
  

  return (
    <div className="loginpage-container">
      <div className="loginpage-card">
        
        <h1 className="loginpage-title text-center mb-4 mt-5">WELCOME </h1>
        <p className="loginpage-subtitle text-center mb-4 mt-5">Please choose your role to continue</p>
        <div class="d-flex flex-column justify-content-end">
        <div className="loginpage-btn-row">
          <button
            className="loginpage-btn user-btn firstcard" 
            onClick={() => navigate("/user")}
          >
            User
          </button>

          <button
            className="loginpage-btn admin-btn firstcard m-2"
            onClick={() => navigate("/admin")}
          >
            Admin
          </button>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Home;