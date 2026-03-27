import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function User() {
  
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
      
        // if success -> go to next page
        if (res.status === 200) {
          navigate("/userfront");
        }
      } catch (err) {
        // if backend returns 401
        if (err.response && err.response.status === 401) {
          setError("Invalid username or password");
        } else {
          setError("Server error. Please try again.");
        }
      }
    };



  return (
    <div className="container mt-4">
      <div className="mb-3">
        <label htmlFor="formGroupExampleInput" className="form-label">
          Username
        </label>
        <input
          type="text"
          className="form-control"
          id="formGroupExampleInput"
          placeholder="Enter here"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="formGroupExampleInput2" className="form-label">
          Password
        </label>
        <input
          type="text"
          className="form-control"
          id="formGroupExampleInput2"
          placeholder="Password"
        />
      </div>
      <div>
        <button onClick={handleSubmit}>Submit</button>
      </div>

    </div>
    
  );
}

export default User;