import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const API_BASE = "http://localhost:8082";

const statusBadge = (status) => {
  switch (status) {
    case "OPEN":
      return "secondary";
    case "IN_PROGRESS":
      return "warning";
    case "RESOLVED":
      return "success";
    default:
      return "secondary";
  }
};

const priorityBadge = (priority) => {
  switch (priority) {
    case "LOW":
      return "info";
    case "MEDIUM":
      return "primary";
    case "HIGH":
      return "warning";
    case "CRITICAL":
      return "danger";
    default:
      return "secondary";
  }
};

function AdminFront() {
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState("");
  const [category, setCategory] = useState(
    localStorage.getItem("selectedService") || "ALL"
  );
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Guard stays inside AdminFront (simple)
  useEffect(() => {
    // If AdminFront ever renders on a wrong route, push to admin login
    if (location.pathname !== "/admin") {
      navigate("/admin/login", { replace: true });
      return;
    }

    // Normal guard: only ADMIN can stay on /admin
    if (localStorage.getItem("role") !== "ADMIN") {
      navigate("/admin/login", { replace: true });
    }
  }, [navigate, location.pathname]);

  const loadTickets = async (cat) => {
    try {
      setLoading(true);
      setError("");

      if (!cat || cat === "ALL") {
        const res = await axios.get(`${API_BASE}/ticket/admin/all`);
        setTickets(res.data);
      } else {
        const res = await axios.get(
          `${API_BASE}/ticket/admin/category/${cat}`
        );
        setTickets(res.data);
      }
    } catch (e) {
      console.error(e);
      setError("Failed to load tickets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTickets(category);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCategoryChange = (newCat) => {
    setCategory(newCat);
    if (newCat === "ALL") localStorage.removeItem("selectedService");
    else localStorage.setItem("selectedService", newCat);
    loadTickets(newCat);
  };

  const clearFilter = () => {
    setCategory("ALL");
    localStorage.removeItem("selectedService");
    loadTickets("ALL");
  };

  const updateStatus = (id, status) => {
    axios
      .put(`${API_BASE}/ticket/update/${id}`, { status })
      .then(() => loadTickets(category))
      .catch(() => alert("Failed to update status"));
  };

  const updatePriority = (id, priority) => {
    axios
      .put(`${API_BASE}/ticket/update/${id}`, { priority })
      .then(() => loadTickets(category))
      .catch(() => alert("Failed to update priority"));
  };

  const deleteTicket = (id) => {
    if (!window.confirm("Are you sure you want to delete this ticket?")) return;

    axios
      .delete(`${API_BASE}/ticket/delete/${id}`)
      .then(() => loadTickets(category))
      .catch(() => alert("Failed to delete ticket"));
  };

  const logout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    localStorage.removeItem("selectedService");
    navigate("/");
  };

  const summary = useMemo(() => {
    const open = tickets.filter((t) => t.status === "OPEN").length;
    const inProgress = tickets.filter((t) => t.status === "IN_PROGRESS").length;
    const resolved = tickets.filter((t) => t.status === "RESOLVED").length;
    return { open, inProgress, resolved, total: tickets.length };
  }, [tickets]);

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
          <span className="text-muted small">Admin Panel</span>
          <button className="btn btn-outline-danger btn-sm" onClick={logout}>
            Logout
          </button>
        </div>
      </nav>

      {/* Header + Filter */}
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h3 className="fw-bold mb-0">Admin Dashboard</h3>

        <div className="d-flex gap-2 align-items-center">
          <select
            className="form-select form-select-sm shadow-sm"
            value={category}
            onChange={(e) => handleCategoryChange(e.target.value)}
            style={{ width: "200px" }}
          >
            <option value="ALL">All Categories</option>
            <option value="IT">IT</option>
            <option value="FACILITIES">FACILITIES</option>
            <option value="HR">HR</option>
          </select>

          <button className="btn btn-outline-secondary btn-sm" onClick={clearFilter}>
            Clear
          </button>
        </div>
      </div>

      {category !== "ALL" && (
        <div className="alert alert-info py-2 mb-3">
          Active Filter: <b>{category}</b>
        </div>
      )}

      {/* Summary */}
      <div className="row g-3 mb-3">
        {[
          ["Total", summary.total],
          ["OPEN", summary.open],
          ["IN_PROGRESS", summary.inProgress],
          ["RESOLVED", summary.resolved],
        ].map(([label, value]) => (
          <div className="col-md-3" key={label}>
            <div className="card shadow-sm">
              <div className="card-body py-3">
                <div className="text-muted small">{label}</div>
                <div className="fs-4 fw-bold">{value}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {error && <div className="alert alert-danger">{error}</div>}
      {loading && <div className="alert alert-secondary">Loading tickets…</div>}

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-hover align-middle shadow-sm">
          <thead className="table-dark">
            <tr>
              <th style={{ width: "70px" }}>ID</th>
              <th style={{ width: "180px" }}>Title</th>
              <th>Description</th>
              <th style={{ width: "140px" }}>Created By</th>
              <th style={{ width: "190px" }}>Status</th>
              <th style={{ width: "190px" }}>Priority</th>
              <th style={{ width: "110px" }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {tickets.map((t) => (
              <tr key={t.id}>
                <td className="fw-semibold">{t.id}</td>

                <td>
                  <div className="fw-semibold">{t.title}</div>
                  {t.category && (
                    <span className="badge bg-light text-dark border mt-1">
                      {t.category}
                    </span>
                  )}
                </td>

                <td style={{ maxWidth: "380px" }}>
                  <div className="text-truncate" title={t.description}>
                    {t.description}
                  </div>
                </td>

                <td>{t.createdBy}</td>

                <td>
                  <span className={`badge bg-${statusBadge(t.status)} me-2`}>
                    {t.status}
                  </span>

                  <select
                    className="form-select form-select-sm d-inline w-auto"
                    value={t.status}
                    onChange={(e) => updateStatus(t.id, e.target.value)}
                  >
                    <option value="OPEN">OPEN</option>
                    <option value="IN_PROGRESS">IN_PROGRESS</option>
                    <option value="RESOLVED">RESOLVED</option>
                  </select>
                </td>

                <td>
                  <span className={`badge bg-${priorityBadge(t.priority || "MEDIUM")} me-2`}>
                    {t.priority || "MEDIUM"}
                  </span>

                  <select
                    className="form-select form-select-sm d-inline w-auto"
                    value={t.priority || "MEDIUM"}
                    onChange={(e) => updatePriority(t.id, e.target.value)}
                  >
                    <option value="LOW">LOW</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="HIGH">HIGH</option>
                    <option value="CRITICAL">CRITICAL</option>
                  </select>
                </td>

                <td>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => deleteTicket(t.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {!loading && tickets.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center text-muted py-4">
                  No tickets found for this filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="text-muted small mt-2">
        Tip: Hover on the description to see full text.
      </div>
    </div>
  );
}

export default AdminFront;
