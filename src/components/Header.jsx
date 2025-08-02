import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { toast } from "react-toastify";

const Header = () => {
  const [authData, setAuthData] = useState({
    jwttoken: "",
    role: "",
    name: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("jwttoken");
    const role = sessionStorage.getItem("role");
    const name = sessionStorage.getItem("name");
    if (token && role) {
      setAuthData({ token, role, name });
    }
  }, []);

  const logoutBtn = () => {
    sessionStorage.clear();
    setAuthData({ token: "", role: "", name: "" });
    toast.success("Logout Successful");
    navigate("/login");
  };

  const isLoggedIn = !!authData.token;
  const isApplicant = authData.role === "applicant";

  return (
    <div className="sticky-top shadow-sm" style={{ backgroundColor: "#000" }}>
      <nav className="navbar navbar-expand-lg navbar-dark container">
        <div className="container-fluid">
          {/* Logo */}
          <Link className="navbar-brand" to="/">
            <h1 className="fw-bold text-white">Nex<span style={{color:"#2196F3"}}>Hire</span></h1>
          </Link>

          {/* Toggle Button */}
          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Collapsible Nav Links */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-3">
              {/* Visible to all logged in users */}
              {isLoggedIn && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link fw-semibold" to="/jobs">
                      Find Job
                    </Link>
                  </li>
                  {isApplicant && (
                    <li className="nav-item">
                      <Link
                        className="nav-link fw-semibold"
                        to="/applicantprofile"
                      >
                        Applied Jobs
                      </Link>
                    </li>
                  )}
                </>
              )}
            </ul>

            {/* Right Side Buttons */}
            <div className="d-flex align-items-center gap-3">
  {isLoggedIn ? (
    <>
      {/* Profile Link */}
      <Link
        to={isApplicant ? "/applicantprofile" : "/employer/dashboard"}
        className="d-flex align-items-center gap-2 text-decoration-none"
      >
        <div
          className="bg-white text-primary rounded-circle d-flex justify-content-center align-items-center"
          style={{ width: "36px", height: "36px" }}
        >
          <i className="fa-regular fa-user"></i>
        </div>
        <span className="fw-semibold text-white d-none d-md-inline">
          {authData.name}
        </span>
      </Link>

      {/* Logout Button */}
      <button
        className="btn btn-outline-light btn-sm px-4 rounded-pill fw-semibold"
        onClick={logoutBtn}
        style={{ backgroundColor: "#dc3545", borderColor: "#dc3545" }}
      >
        Logout
      </button>
    </>
  ) : (
    <Link to="/login">
      <button className="btn btn-primary btn-sm px-4 rounded-pill fw-semibold">
        Login
      </button>
    </Link>
  )}
</div>

          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
