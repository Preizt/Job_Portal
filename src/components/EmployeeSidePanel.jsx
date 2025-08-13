import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

const EmployeeSidePanel = ({ toggleSidebar }) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { to: "/employer/dashboard", icon: "fa-chart-line", label: "Dashboard" },
    { to: "/employer/addjob", icon: "fa-briefcase", label: "Job Listing" },
    { to: "/employer/applications", icon: "fa-users", label: "Applications" },
  ];

  const handleLogout = () => {
    setShowModal(false);
    navigate("/");
  };

  return (
    <div style={styles.sidebar}>
      {/* Close Button */}
      <div style={styles.toggleWrapper}>
        <button onClick={toggleSidebar} style={styles.toggleBtn}>
          <i className="fa-solid fa-xmark" />
        </button>
      </div>

      {/* Brand */}
      <div style={styles.brand}>
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <h2 style={styles.brandText}>
            Nex<span style={styles.accent}>Hire</span>
          </h2>
        </Link>
        <hr style={{ borderColor: "#444", opacity: 0.3 }} />
      </div>

      {/* Section Title */}
      <h6 style={styles.sectionTitle}>EMPLOYER PANEL</h6>

      {/* Navigation */}
      <ul style={styles.navList}>
        {navItems.map((item, idx) => (
          <li key={idx} style={styles.navItem}>
            <Link
              to={item.to}
              style={{
                ...styles.navLink,
                backgroundColor:
                  location.pathname === item.to ? "#1f2a40" : "transparent",
                color: location.pathname === item.to ? "#61dafb" : "#bbb",
              }}
            >
              <i
                className={`fa-solid ${item.icon}`}
                style={{ width: "20px" }}
              ></i>
              <span style={{ marginLeft: "10px" }}>{item.label}</span>
            </Link>
          </li>
        ))}

        {/* Back to Home */}
        <li style={{ ...styles.navItem, marginTop: "40px" }}>
          <button
            onClick={handleLogout}
            style={{
              ...styles.navLink,
              backgroundColor: "transparent",
              color: "#bbb",
              border: "none",
              width: "100%",
              textAlign: "left",
              cursor: "pointer",
            }}
          >
            <i className="fa-solid fa-arrow-left" style={{ width: "20px" }}></i>
            <span style={{ marginLeft: "10px" }}>Back to Home</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

const styles = {
  sidebar: {
    width: "250px",
    backgroundColor: "#121212",
    minHeight: "100vh",
    padding: "20px 15px",
    color: "#fff",
    boxShadow: "2px 0 12px rgba(0,0,0,0.3)",
    position: "relative",
  },
  toggleWrapper: {
    position: "absolute",
    top: "10px",
    right: "10px",
  },
  toggleBtn: {
    background: "transparent",
    border: "none",
    color: "#bbb",
    fontSize: "20px",
    cursor: "pointer",
  },
  brand: {
    textAlign: "center",
    marginBottom: "15px",
    marginTop: "30px",
  },
  brandText: {
    fontWeight: "bold",
    fontSize: "22px",
    color: "#fff",
    letterSpacing: "1px",
  },
  accent: {
    color: "#61dafb",
  },
  sectionTitle: {
    fontSize: "13px",
    color: "#888",
    textTransform: "uppercase",
    letterSpacing: "1px",
    marginBottom: "15px",
    paddingLeft: "10px",
  },
  navList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  navItem: {
    marginBottom: "16px",
  },
  navLink: {
    display: "flex",
    alignItems: "center",
    padding: "10px 12px",
    borderRadius: "6px",
    textDecoration: "none",
    fontWeight: "500",
    fontSize: "15px",
    transition: "all 0.2s ease-in-out",
  },
};

export default EmployeeSidePanel;
