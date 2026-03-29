import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Users.css";

function Admin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:8082/api/auth/login", {
        username,
        password,
      });

      if (res.status === 200 && res.data.role === "ADMIN") {
        localStorage.setItem("username", res.data.username);
        localStorage.setItem("role", res.data.role);
        navigate("/admin");
      } else {
        setError("You are not authorized as Admin");
      }
    } catch {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="user-page">
      <div className="user-card shadow">
        <h3 className="text-center mb-4">Admin Login</h3>

        {error && <p className="text-danger text-center">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            className="form-control mb-3"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="btn btn-success w-100">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Admin;