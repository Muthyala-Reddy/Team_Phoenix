import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function UpdateIncident() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [Created_at, setCreated_at] = useState("");
  const [Priority, setPriority] = useState("");

  // ✅ Fetch incident details by id
  useEffect(() => {
    axios
      .get(`http://localhost:8080/incidents/${id}`)
      .then((res) => {
        setName(res.data.name);
      })
      .catch((err) => console.error("Error fetching incident:", err));
  }, [id]);

  // ✅ Update incident
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:8080/incidents/${id}`, { name })
      .then(() => {
        alert("Incident updated successfully!");
        navigate("/alloted"); // ✅ back to alloted page after update
      })
      .catch((err) => console.error("Update failed:", err));
  };

  return (
    <div>
          <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Phoenix</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav">
        <a className="nav-link active" aria-current="page" href="#">CREATE</a>
        <a className="nav-link" href="#">READ</a>
        <a className="nav-link" href="#">DELETE</a>
        <a className="nav-link disabled" aria-disabled="true">Disabled</a>
      </div>
    </div>
  </div>
</nav>
      <div className="container mt-4">
      <h2 className="text-center mb-4">Update Incident</h2>
    
      <form onSubmit={handleSubmit} className="w-50 mx-auto">
        <div className="mb-3">
          <label className="form-label">Incident Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label className="form-label">Created_at</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setCreated_at(e.target.value)}
          />
          <label className="form-label">Priority</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setPriority(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-success w-100">
          Update
        </button>
      </form>
    </div>


    </div>
    
  );
}

export default UpdateIncident;