import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const API_BASE = "http://localhost:8082";

function UserFront() {
  const [tickets, setTickets] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("MEDIUM");
  const [status, setStatus] = useState("OPEN");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  // ✅ keep category synced with Home selection
  const [category, setCategory] = useState(
    localStorage.getItem("selectedService") || "IT"
  );

  // ✅ Guard
  useEffect(() => {
    if (!username) navigate("/login");
  }, [username, navigate]);

  // ✅ Sync category when user clicks a service on Home (same tab)
  useEffect(() => {
    const syncService = () => {
      const s = localStorage.getItem("selectedService");
      if (s) setCategory(s);
    };
    window.addEventListener("focus", syncService);
    return () => window.removeEventListener("focus", syncService);
  }, []);

  // ✅ Fetch user tickets
  useEffect(() => {
    if (!username) return;

    axios
      .get(`${API_BASE}/ticket/User`, { params: { username } })
      .then((res) => setTickets(res.data))
      .catch(() => setError("Failed to fetch tickets"));
  }, [username]);

  const handleCreateTicket = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const payload = {
        title,
        description,
        status,
        priority,
        category, // ✅ important
      };

      const res = await axios.post(`${API_BASE}/ticket/create`, payload, {
        params: { username },
      });

      setTickets((prev) => [...prev, res.data]);
      setTitle("");
      setDescription("");
      setPriority("MEDIUM");
      setStatus("OPEN");
    } catch {
      setError("Failed to create ticket.");
    }
  };

  const logout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    // keep selectedService if you want the user to keep context
    navigate("/");
  };

  return (
    <div className="container mt-4">
      {/* ✅ Top Navbar */}
      <nav className="navbar navbar-light bg-white shadow-sm px-4 mb-4">
        <span
          className="navbar-brand fw-bold text-primary"
          role="button"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          TicketSupport
        </span>
        <div className="d-flex align-items-center gap-3">
          <span className="text-muted small">User Dashboard</span>
          <button className="btn btn-outline-danger btn-sm" onClick={logout}>
            Logout
          </button>
        </div>
      </nav>

      {error && <div className="alert alert-danger">{error}</div>}

      {/* ✅ Create Ticket Card */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h5 className="fw-bold mb-3">
            Create Ticket{" "}
            <span className="badge bg-light text-dark border">{category}</span>
          </h5>

          <form onSubmit={handleCreateTicket}>
            {/* Category */}
            <div className="mb-3">
              <label className="form-label">Category</label>
              <select
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="IT">IT</option>
                <option value="FACILITIES">FACILITIES</option>
                <option value="HR">HR</option>
              </select>
              <small className="text-muted">
                Auto-selected from Home page service card
              </small>
            </div>

            {/* Title */}
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                className="form-control"
                placeholder="Enter issue title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            {/* Description */}
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                rows="3"
                placeholder="Describe your issue"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <button className="btn btn-primary">Submit Ticket</button>
          </form>
        </div>
      </div>

      {/* ✅ Tickets Table */}
      <h5 className="fw-bold mb-3">My Tickets ({username})</h5>

      <div className="table-responsive">
        <table className="table table-hover align-middle shadow-sm">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Category</th>
              <th>Status</th>
              <th>Priority</th>
            </tr>
          </thead>

          <tbody>
            {tickets.map((t) => (
              <tr key={t.id}>
                <td className="fw-semibold">{t.id}</td>
                <td>{t.title}</td>
                <td>
                  <span className="badge bg-light text-dark border">
                    {t.category}
                  </span>
                </td>
                <td>{t.status}</td>
                <td>{t.priority}</td>
              </tr>
            ))}

            {tickets.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center text-muted py-4">
                  No tickets created yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserFront;