import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
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
    const res = await axios.post("http://localhost:8080/api/auth/login", {
      username,
      password,
    });

    if (res.status === 200) {
      navigate("/userfront");
    }
  } catch (err) {
    if (err.response && err.response.status === 401) {
      setError("Invalid username or password");
    } else {
      setError("Server error. Please try again.");
    }
  }
};

 return (
    <div className="user-page">
      <div className="user-card shadow">
        <h3 className="text-center mb-4">Admin Login</h3>

        {/* show error */}
        {error && <p className="text-danger text-center">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control form-control-sm"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-success w-100">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Admin;