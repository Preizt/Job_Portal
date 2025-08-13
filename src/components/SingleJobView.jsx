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
import {
  getappliedJobs,
  getUserSavedPost,
  postApply,
  savedJobPost,
  singlePostView,
} from "../services/allAPI";
import baseURL from "../services/baseURL";
import moment from "moment";
import { toast } from "react-toastify";
import socket, { connectSocket, onNewJobPost } from "../services/socketService";

const SingleJobView = () => {
  const [applyData, setApplyData] = useState({
    job: "",
    coverLetter: "",
    resume: "",
  });
  const [appliedJobIds, setAppliedJobIds] = useState([]);

  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [show, setShow] = useState(false);
  const [savedJobs, setSavedJobs] = useState([]);
  const [isSaved, setIsSaved] = useState(false);

  const handleClose = () => setShow(false);

  const { id } = useParams();

  useEffect(() => {
    jobView();
    fetchSavedJobs();
  }, []);

  const jobView = async () => {
    try {
      const apiResponse = await singlePostView(id);
      if (apiResponse.status == 200) {
        setData(apiResponse.data);
      } else {
        console.log("Failed to fetch job post. Status:", apiResponse.status);
      }
    } catch (error) {
      console.log("Error fetching job post", error);
    }
  };

  const saveJobPost = async (id) => {
    const token = sessionStorage.getItem("jwttoken");

    if (token) {
      try {
        const reqHeader = { Authorization: `Bearer ${token}` };

        const apiResponse = await savedJobPost(reqHeader, id);

        if (apiResponse.status === 200) {
          toast.success("Job saved successfully");
          setIsSaved(true);
        } else if (apiResponse.status === 400) {
          toast.info("Job is Already Saved");
          setIsSaved(true);
        } else if (apiResponse.status === 404) {
          toast.error("Job not found");
        } else {
          toast.error("Could not save job");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error("🔒 Please login first");
    }
  };

  const fetchSavedJobs = async () => {
    const token = sessionStorage.getItem("jwttoken");
    if (!token) return;

    try {
      const reqHeader = { Authorization: `Bearer ${token}` };
      const response = await getUserSavedPost(reqHeader);

      if (response.status === 200) {
        setSavedJobs(response.data);

        // Check if this job is in the saved list
        const jobIsSaved = response.data.some((job) => job._id === id);
        setIsSaved(jobIsSaved);
      }
    } catch (error) {
      console.error("Error fetching saved jobs:", error);
    }
  };

  const handleShow = () => {
    setApplyData((previousData) => ({ ...previousData, job: data._id }));
    setShow(true);
  };

  const applyForPost = async () => {
    const token = sessionStorage.getItem("jwttoken");

    if (!token) {
      toast.warning("Please login to Apply");
      return;
    }

    if (!applyData.coverLetter || !applyData.resume) {
      toast.warning("All fields are required");
      return;
    }

    const reqHeader = {
      Authorization: `Bearer ${token}`,
    };

    const payload = new FormData();
    payload.append("job", applyData.job);
    payload.append("coverLetter", applyData.coverLetter);
    payload.append("resume", applyData.resume);

    try {
      const apiResponse = await postApply(payload, reqHeader);
      if (apiResponse.status === 201) {
        toast.success("Applied Successfully");
        setShow(false);
        setApplyData({ job: "", coverLetter: "", resume: null });
      } else if (apiResponse.status === 409) {
        toast.info("Already Applied");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Failed to Apply");
      console.error(error);
    }
  };

  const getAppliedJobs = async () => {
    const token = sessionStorage.getItem("jwttoken");
    if (!token) {
      // toast.warning("Please Login");
      navigate();
      return;
    }

    const reqHeader = {
      Authorization: `Bearer ${token}`,
    };

    try {
      const apiResponse = await getappliedJobs(reqHeader);

      if (apiResponse.status === 200) {
        const appliedJobs = apiResponse.data;

        const ids = appliedJobs.map((item) => item.job._id);
        setAppliedJobIds(ids);
        getAppliedJobs();
      }
    } catch (error) {
      console.error("Failed to fetch applied jobs:", error);
    }
  };

  useEffect(() => {
    getAppliedJobs();
  }, []);

  useEffect(() => {
    const token = sessionStorage.getItem("jwttoken");
    if (token) {
      connectSocket(token);
    }

    onNewJobPost((job) => {
      toast.info(`New Job Posted by ${job.company}: ${job.title}`);
      jobView();
    });

    return () => {
      socket.off("newJobPost");
    };
  }, []);

  const role = sessionStorage.getItem("role");

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
                {!sessionStorage.getItem("jwttoken") ? (
                  <div className="text-danger mt-3 text-center">
                    Please{" "}
                    <a href="/login" style={{ textDecoration: "none" }}>
                      login
                    </a>{" "}
                    to apply this job.
                  </div>
                ) : role === "applicant" ? (
                  <>
                    <Button
                      variant={isSaved ? "success" : "outline-primary"}
                      onClick={() => saveJobPost(data._id)}
                      style={styles.saveButton}
                    >
                      {isSaved ? (
                        <BookmarkCheck
                          size={18}
                          style={{ marginRight: "8px" }}
                        />
                      ) : (
                        <Bookmark size={18} style={{ marginRight: "8px" }} />
                      )}
                      {isSaved ? "Saved" : "Save Job"}
                    </Button>

                    {appliedJobIds.includes(data._id) ? (
                      <Button
                        variant="success"
                        size="lg"
                        style={styles.applyButton}
                        onClick={() =>
                          toast.info("Check your profile for Status")
                        }
                      >
                        Applied
                      </Button>
                    ) : (
                      <Button
                        variant="primary"
                        onClick={handleShow}
                        size="lg"
                        style={styles.applyButton}
                      >
                        Apply Now
                      </Button>
                    )}
                  </>
                ) : (
                  <div className="text-danger mt-3">
                    You are a recruiter, you can't apply to jobs.
                  </div>
                )}
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
        <Modal.Header closeButton>
          <Modal.Title>
            Applying for <span className="text-primary">{data.title}</span>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form className="px-2">
            {/* Cover Letter */}
            <div className="mb-4">
              <label className="form-label fw-semibold text-dark mb-2">
                Cover Letter
              </label>
              <textarea
                className="form-control border-2 border-light rounded-3 p-3"
                style={{ minHeight: "150px" }}
                placeholder="Tell the employer why you're a good fit for this position..."
                onChange={(e) =>
                  setApplyData({ ...applyData, coverLetter: e.target.value })
                }
              ></textarea>
              <div className="form-text text-end">Max 1000 characters</div>
            </div>

            {/* Resume Upload */}
            <div className="mb-3">
              <label className="form-label fw-semibold text-dark mb-2">
                Resume <span className="text-danger">*</span>
              </label>
              <div className="border-2 border-dashed border-light rounded-3 p-4 text-center bg-light bg-opacity-10">
                <input
                  type="file"
                  className="form-control d-none"
                  id="resumeUpload"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) =>
                    setApplyData({ ...applyData, resume: e.target.files[0] })
                  }
                />
                <label
                  htmlFor="resumeUpload"
                  className="btn btn-outline-primary mb-2"
                >
                  <i className="bi bi-upload me-2"></i>Choose File
                </label>
                <p className="small text-muted mb-1">PDF, DOC, DOCX</p>
                {applyData.resume && (
                  <p className="small text-success mb-0">
                    <i className="bi bi-check-circle-fill me-1"></i>
                    {applyData.resume.name}
                  </p>
                )}
              </div>
            </div>
          </form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" onClick={applyForPost}>
            Apply
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
