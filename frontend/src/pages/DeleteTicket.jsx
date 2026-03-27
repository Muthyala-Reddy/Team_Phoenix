import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function DeleteTicket() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  

  // ✅ Fetch incident details by id
  useEffect(() => {
    axios
      .get(`http://localhost:8082/incidents/${id}`)
      .then((res) => {
        setName(res.data.name);
      })
      .catch((err) => console.error("Error fetching incident:", err));
  }, [id]);
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:8082/incidents/${id}`, { name })
      .then(() => {
        alert("Incident deleted successfully!");
        navigate("/alloted"); // ✅ back to alloted page after update
      })
      .catch((err) => console.error("delete failed:", err));
  };


  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Delete Incident</h2>
      

      <form onSubmit={handleSubmit} className="w-50 mx-auto">
        <div className="mb-3">
          <label className="form-label">Incident Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          
        </div>

        <button type="submit" className="btn btn-success w-100">
          Delete
        </button>
      </form>
    </div>
  );
}

export default DeleteTicket;