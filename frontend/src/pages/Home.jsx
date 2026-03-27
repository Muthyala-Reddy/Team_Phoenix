import React from "react";
import { useNavigate } from "react-router-dom";
import '../styles/Users.css'; 
import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
  const navigate = useNavigate();
  

  return (
    <div className="loginpage-container">
      <div className="loginpage-card">
        
        <h2 className="loginpage-title">Welcome</h2>
        <p className="loginpage-subtitle">Please choose your role to continue</p>
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