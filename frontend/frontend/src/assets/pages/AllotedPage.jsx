import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AllotedPage() {
  const [incidents, setIncidents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Replace this URL with your actual backend endpoint
    axios
      .get("http://localhost:8080/incidents") 
      .then((res) => setIncidents(res.data))
      .catch((err) => console.error("Error fetching incidents:", err));
  }, []);

  const handleUpdateClick = (id) => {
    // ✅ navigate to update page with incident id
    navigate(`/UpdateTicket/${id}`);
  };
  const handleDeleteeClick = (id) => {
    // ✅ navigate to delete page with incident id
    navigate(`/DeleteTicket/${id}`);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Alloted Incidents</h2>

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Incident</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {incidents.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center">
                No incidents found
              </td>
            </tr>
          ) : (
            incidents.map((inc) => (
              <tr key={inc.id}>
                <td>{inc.id}</td>
                <td>{inc.name}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleUpdateClick(inc.id)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleDeleteClick(inc.id)}
                  >
                    Deleted
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AllotedPage;