import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const Header = () => {
  return (
    <div className="sticky-top shadow-sm" style={{ backgroundColor: "#000" }}>
      <nav className="navbar navbar-expand-lg navbar-dark container">
        <div className="container-fluid">
          {/* Logo */}
          <Link className="navbar-brand" to="/">
            <h1>NexHire</h1>
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
              <li className="nav-item">
                <Link className="nav-link fw-semibold" to="/jobs">
                  Find Job
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fw-semibold" to="/uploadjobs">
                  Upload Job
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fw-semibold " to="/appliedjobs">
                  Applied Jobs
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fw-semibold" to="/applicants">
                  Applied Candidates
                </Link>
              </li>
            </ul>

            {/* Login/Profile Button */}
            <div className="d-flex align-items-center gap-3">
              <Link to={"/login"}>
               <button className="btn btn-sm px-3 text-white btn-success rounded-5">
                Login
              </button>
              </Link>
             

              <Link to="/profile" className="text-white">
                <i className="fa-regular fa-user fs-5"></i>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
