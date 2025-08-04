import React, { useEffect, useState } from "react";
import {
  Bookmark,
  BookmarkCheck,
  ArrowLeft,
  MapPin,
  Clock,
  DollarSign,
  Briefcase,
  Building,
  FileText,
  CheckCircle,
} from "lucide-react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Header from "./Header";
import Footer from "./Footer";
import { useNavigate, useParams } from "react-router-dom";
import { singlePostView } from "../services/allAPI";
import baseURL from "../services/baseURL";
import moment from "moment";

const SingleJobView = () => {
  const [data, setData] = useState({});
  const [show, setShow] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSave = () => setSaved(!saved);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    jobView();
  }, []);

  const jobView = async () => {
    try {
      const apiResponse = await singlePostView(id);
      setData(apiResponse.data);
    } catch (error) {
      console.log("Error fetching job post", error);
    }
  };

  return (
    <div style={styles.pageContainer}>
      <Header />

      {/* Hero Section */}
      <div style={styles.heroSection}>
        <div style={styles.heroContent}>
          <button onClick={() => navigate(-1)} style={styles.backBtn}>
            <ArrowLeft size={18} style={{ marginRight: "6px" }} />
            Back to Jobs
          </button>
          <div style={styles.heroText}>
            <h1 style={styles.heroTitle}>{data.title}</h1>
            <div style={styles.heroMeta}>
              <span style={styles.heroMetaItem}>
                <Building size={16} style={{ marginRight: "6px" }} />
                {data.company}
              </span>
              <span style={styles.heroMetaItem}>
                <MapPin size={16} style={{ marginRight: "6px" }} />
                {data.location}
              </span>
              <span style={styles.heroMetaItem}>
                <DollarSign size={16} style={{ marginRight: "6px" }} />
                {data.salary} LPA
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main style={styles.mainContent}>
        <div style={styles.contentGrid}>
          {/* Job Details Column */}
          <div style={styles.detailsColumn}>
            <section style={styles.section}>
              <h2 style={styles.sectionTitle}>
                <FileText size={20} style={{ marginRight: "10px" }} />
                Job Description
              </h2>
              <p style={styles.sectionText}>{data.description}</p>
            </section>

            <section style={styles.section}>
              <h2 style={styles.sectionTitle}>
                <CheckCircle size={20} style={{ marginRight: "10px" }} />
                Requirements
              </h2>
              <ul style={styles.requirementsList}>
                {data.requirements &&
                  data.requirements.split("\n").map((item, index) => (
                    <li key={index} style={styles.requirementItem}>
                      {item}
                    </li>
                  ))}
              </ul>
            </section>
          </div>

          {/* Sidebar Column */}
          <div style={styles.sidebarColumn}>
            <div style={styles.actionCard}>
              <div style={styles.companyLogoContainer}>
                <img
                  src={`${baseURL}/uploads/${data.image}`}
                  alt="Company Logo"
                  style={styles.companyLogo}
                />
              </div>

              

              <div style={styles.actionButtons}>
                <Button
                  variant={saved ? "success" : "outline-primary"}
                  onClick={handleSave}
                  style={styles.saveButton}
                >
                  {saved ? (
                    <BookmarkCheck size={18} style={{ marginRight: "8px" }} />
                  ) : (
                    <Bookmark size={18} style={{ marginRight: "8px" }} />
                  )}
                  {saved ? "Saved" : "Save Job"}
                </Button>

                <Button
                  variant="primary"
                  onClick={handleShow}
                  size="lg"
                  style={styles.applyButton}
                >
                  Apply Now
                </Button>
              </div>

              <div style={styles.jobMeta}>
                
                <div style={styles.metaItem}>
                  <Clock
                    size={16}
                    style={{ marginRight: "10px", color: "#4f46e5" }}
                  />
                  <div>
                    <div style={styles.metaLabel}>Posted</div>
                    <div style={styles.metaValue}>
                      {data.time ? moment(data.time).fromNow() : "Recently"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modal */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton style={styles.modalHeader}>
          <Modal.Title style={styles.modalTitle}>
            Apply for {data.title} at {data.company}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Application form would go here...</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Submit Application
          </Button>
        </Modal.Footer>
      </Modal>

      <Footer />
    </div>
  );
};

const styles = {
  pageContainer: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: "#ffffff",
  },
  heroSection: {
    backgroundColor: "#2563eb",
    color: "#ffffff",
    padding: "60px 0",
    position: "relative",
  },
  heroContent: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px",
    position: "relative",
    zIndex: 2,
  },
  heroText: {
    maxWidth: "800px",
  },
  heroTitle: {
    fontSize: "2.5rem",
    fontWeight: "700",
    margin: "20px 0 15px 0",
    lineHeight: "1.2",
  },
  heroMeta: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    marginTop: "15px",
  },
  heroMetaItem: {
    display: "flex",
    alignItems: "center",
    fontSize: "1.1rem",
  },
  backBtn: {
    display: "inline-flex",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    border: "none",
    color: "#ffffff",
    padding: "8px 16px",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.2s ease",
    ":hover": {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
  },
  mainContent: {
    flex: 1,
    padding: "40px 20px",
    maxWidth: "1200px",
    margin: "0 auto",
    width: "100%",
  },
  contentGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 350px",
    gap: "40px",
    alignItems: "start",
  },
  detailsColumn: {
    paddingRight: "20px",
  },
  sidebarColumn: {
    position: "sticky",
    top: "20px",
  },
  actionCard: {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
    padding: "25px",
    border: "1px solid #e2e8f0",
  },
  companyLogoContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
  },
  companyLogo: {
    width: "120px",
    height: "120px",
    borderRadius: "8px",
    objectFit: "cover",
    border: "1px solid #e2e8f0",
    backgroundColor: "#f8fafc",
   
  },
  actionButtons: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginBottom: "25px",
  },
  saveButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px",
    fontWeight: "500",
  },
  applyButton: {
    padding: "12px",
    fontWeight: "600",
  },
  section: {
    marginBottom: "40px",
  },
  sectionTitle: {
    fontSize: "1.5rem",
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: "20px",
    display: "flex",
    alignItems: "center",
    paddingBottom: "10px",
    borderBottom: "1px solid #f1f5f9",
  },
  sectionText: {
    fontSize: "1.1rem",
    color: "#475569",
    lineHeight: "1.7",
    marginBottom: "20px",
  },
  requirementsList: {
    listStyleType: "none",
    paddingLeft: "0",
  },
  requirementItem: {
    fontSize: "1.1rem",
    color: "#475569",
    lineHeight: "1.7",
    marginBottom: "12px",
    display: "flex",
    alignItems: "flex-start",
    ":before": {
      content: "'•'",
      color: "#4f46e5",
      fontWeight: "bold",
      display: "inline-block",
      width: "1em",
      marginLeft: "-1em",
    },
  },
  jobMeta: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  metaItem: {
    display: "flex",
    alignItems: "center",
  },
  metaLabel: {
    fontSize: "0.9rem",
    color: "#64748b",
  },
  metaValue: {
    fontSize: "1rem",
    color: "#1e293b",
    fontWeight: "500",
  },
  modalHeader: {
    borderBottom: "1px solid #e2e8f0",
    padding: "25px",
  },
  modalTitle: {
    fontSize: "1.3rem",
    fontWeight: "600",
    color: "#1e293b",
  },
};

export default SingleJobView;
