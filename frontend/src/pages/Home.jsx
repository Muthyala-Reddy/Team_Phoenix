import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Home.css";

function Home() {
  const navigate = useNavigate();

  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [role, setRole] = useState(localStorage.getItem("role"));

  useEffect(() => {
    const syncAuth = () => {
      setUsername(localStorage.getItem("username"));
      setRole(localStorage.getItem("role"));
    };
    window.addEventListener("storage", syncAuth);
    return () => window.removeEventListener("storage", syncAuth);
  }, []);

  const logout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    localStorage.removeItem("selectedService");
    setUsername(null);
    setRole(null);
    navigate("/");
  };

  const handleServiceClick = (service) => {
    localStorage.setItem("selectedService", service);

    if (!username) {
      navigate("/login");
      return;
    }

    if (role === "ADMIN") navigate("/admin");
    else navigate("/user");
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <nav className="navbar navbar-light bg-white shadow-sm px-4">
        <span
          className="navbar-brand fw-bold text-primary"
          role="button"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          TicketSupport
        </span>

        {!username ? (
          <div>
            <button
              className="btn btn-outline-primary me-2"
              onClick={() => navigate("/login")}
            >
              User Login
            </button>
            <button
              className="btn btn-primary"
              onClick={() => navigate("/admin/login")}
            >
              Admin Login
            </button>
          </div>
        ) : (
          <div className="d-flex align-items-center gap-2">
            <span className="text-muted">
              Welcome, <b>{username}</b> ({role})
            </span>
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        )}
      </nav>
      <div className="hero-section text-center text-white py-5">
        <h2 className="fw-bold">Welcome to TicketSupport</h2>
        <p className="lead">
          A simple way to raise and manage support tickets
        </p>
      </div>
      <div className="container mt-5 flex-grow-1">
        <h5 className="text-center mb-4 fw-semibold">
          Which service desk do you need help with?
        </h5>

        <div className="row text-center g-4">
          <div className="col-md-4">
            <div
              className="service-card shadow-sm h-100"
              role="button"
              onClick={() => handleServiceClick("IT")}
            >
              <i className="bi bi-pc-display fs-1 text-primary"></i>
              <h6 className="mt-3 fw-bold">IT Help Desk</h6>
              <p className="text-muted small">
                Login issues, system errors, API support
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div
              className="service-card shadow-sm h-100"
              role="button"
              onClick={() => handleServiceClick("FACILITIES")}
            >
              <i className="bi bi-building fs-1 text-success"></i>
              <h6 className="mt-3 fw-bold">Facilities Help Desk</h6>
              <p className="text-muted small">
                Infrastructure, office, facilities support
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div
              className="service-card shadow-sm h-100"
              role="button"
              onClick={() => handleServiceClick("HR")}
            >
              <i className="bi bi-people fs-1 text-warning"></i>
              <h6 className="mt-3 fw-bold">HR Help Desk</h6>
              <p className="text-muted small">
                Payroll, onboarding, HR queries
              </p>
            </div>
          </div>
        </div>
      </div>
      <footer className="bg-dark text-light mt-5">
        <div className="container py-4">
          <div className="row">
            <div className="col-md-6">
              <h6 className="fw-bold">TicketSupport</h6>
              <p className="small text-light opacity-75 mb-0">
                Internal service desk application for managing support requests.
              </p>
            </div>

            <div className="col-md-6 text-md-end mt-3 mt-md-0">
              <a href="#" className="text-light me-3 small text-decoration-none">
                Privacy
              </a>
              <a href="#" className="text-light me-3 small text-decoration-none">
                Terms
              </a>
              <a href="#" className="text-light small text-decoration-none">
                Contact
              </a>
            </div>
          </div>

          <hr className="border-secondary my-3" />

          <div className="text-center small text-light opacity-75">
            © {new Date().getFullYear()} TicketSupport. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;