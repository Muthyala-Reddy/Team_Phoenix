import React from "react";
import { useNavigate } from "react-router-dom";


function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className="loginpage-container">
      <div className="loginpage-card">
        <h2 className="loginpage-title">Login</h2>
        <p className="loginpage-subtitle">Choose your role to continue</p>

        <div className="loginpage-btn-row">
          <button
            className="loginpage-btn user-btn"
            onClick={() => navigate("/user")}
          >
            User
          </button>

          <button
            className="loginpage-btn admin-btn"
            onClick={() => navigate("/admin")}
          >
            Admin
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;