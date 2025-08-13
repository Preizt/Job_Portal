import React, { useEffect, useState } from "react";
import {
  acceptApplication,
  applicationsPost,
  rejectApplication,
} from "../../services/allAPI";
import { toast } from "react-toastify";
import moment from "moment";
import baseURL from "../../services/baseURL";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import emailjs from "emailjs-com";

const Applicant = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [applicantData, setApplicantData] = useState([]);

  const getApplicantData = async () => {
    const token = sessionStorage.getItem("jwttoken");
    if (!token) {
      toast.warning("Please Login");
    }

    const reqHeader = {
      Authorization: `Bearer ${token}`,
    };
    const apiResponse = await applicationsPost(reqHeader);
    setApplicantData(apiResponse.data);
    // console.log(apiResponse.data);
  };

  useEffect(() => {
    getApplicantData();
  }, []);

  const applicationAccept = async (id) => {
    console.log(id);

    const token = sessionStorage.getItem("jwttoken");
    if (!token) {
      toast.warning("Please Login");
    }

    const reqHeader = {
      Authorization: `Bearer ${token}`,
    };
    const apiResponse = await acceptApplication(reqHeader, id);
    if (apiResponse.status == 200) {
      toast.success(" Application Accepted");
      console.log(apiResponse);
      getApplicantData();
    }
  };

  const applicationReject = async (id) => {
    const token = sessionStorage.getItem("jwttoken");
    if (!token) {
      toast.warning("Please Login");
    }

    const reqHeader = { Authorization: `Bearer ${token}` };

    try {
      const apiResponse = await rejectApplication(reqHeader, id);
      if (apiResponse.status === 200) {
        toast.success("Application Rejected");
        getApplicantData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const notifyApplicant = (email, name, jobTitle, status) => {
    emailjs
      .send(
        "service_yxucpx9", // Service ID
        "template_lzu6vwr", // Template ID
        {
          to_email: email, // matches {{to_email}} in your template
          applicant_name: name, // matches {{applicant_name}}
          job_title: jobTitle, // matches {{job_title}}
          status: status, // matches {{status}}
        },
        "oZvi5k4U0C0hiYOFS"
      )
      .then(() => {
        toast.success("Email sent successfully!");
      })
      .catch((error) => {
        console.log(error);

        toast.warnig("Error sending email:");
      });
  };

  return (
    <div
      style={{
        padding: "40px",
        backgroundColor: "#121212",
        minHeight: "100vh",
      }}
    >
      <h2
        style={{
          fontWeight: "600",
          marginBottom: "20px",
          fontSize: "28px",
          color: "#e0e0e0",
        }}
      >
        Applicants for Your Job Posts
      </h2>

      {/* <input
        type="text"
        placeholder="Search by job title"
        style={{
          marginBottom: "30px",
          padding: "12px 16px",
          width: "18rem",
          borderRadius: "8px",
          border: "1px solid #333",
          backgroundColor: "#1e1e1e",
          color: "#e0e0e0",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.3)",
          outline: "none",
        }}
      /> */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
          gap: "24px",
        }}
      >
        {applicantData?.map((item, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "#1e1e1e",
              borderRadius: "12px",
              padding: "24px",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
              transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease",
              border: "1px solid #2d2d2d",
              cursor: "pointer",
              width: "22rem",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.2)";
            }}
          >
            <h3
              style={{
                fontSize: "20px",
                fontWeight: "600",
                color: "#ffffff",
                marginBottom: "16px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span
                style={{
                  width: "32px",
                  height: "32px",
                  backgroundColor: "#3700B3",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                }}
              >
                {item.applicant?.name.charAt(0)}
              </span>
              {item.applicant?.name}
            </h3>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px",
                marginBottom: "16px",
              }}
            >
              <div>
                <p
                  style={{
                    margin: "6px 0",
                    color: "#b0b0b0",
                    fontSize: "14px",
                  }}
                >
                  Job Title
                </p>
                <p
                  style={{
                    margin: "6px 0",
                    color: "#ffffff",
                    fontWeight: "500",
                  }}
                >
                  {item.job?.title}
                </p>
              </div>

              <div>
                <p
                  style={{
                    margin: "6px 0",
                    color: "#b0b0b0",
                    fontSize: "14px",
                  }}
                >
                  Company
                </p>
                <p
                  style={{
                    margin: "6px 0",
                    color: "#ffffff",
                    fontWeight: "500",
                  }}
                >
                  {item.job?.company}
                </p>
              </div>
            </div>

            <div
              style={{
                backgroundColor: "#252525",
                borderRadius: "8px",
                padding: "12px",
                marginBottom: "16px",
              }}
            >
              <p
                style={{
                  margin: "0",
                  color: "#b0b0b0",
                  fontSize: "14px",
                  marginBottom: "4px",
                }}
              >
                Status
              </p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span
                  style={{
                    padding: "6px 12px",
                    borderRadius: "20px",
                    backgroundColor:
                      item.status === "Accepted"
                        ? "#4CAF50"
                        : item.status === "Rejected"
                        ? "#F44336"
                        : "#FFA000",

                    color: "#fff",
                    fontSize: "13px",
                    fontWeight: "500",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  {item.status}
                </span>
                <span
                  style={{
                    color: "#9e9e9e",
                    fontSize: "13px",
                    fontWeight: "500",
                  }}
                >
                  Applied on : {moment(item.appliedAt).format("MMM D, YYYY")}
                </span>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                gap: "10px",
                borderTop: "1px solid #2d2d2d",
                paddingTop: "16px",
              }}
            >
              {/* View Button */}
              <button
                style={{
                  padding: "8px 16px",
                  backgroundColor: "transparent",
                  border: "1px solid #007bff",
                  borderRadius: "6px",
                  color: "#fff",
                  cursor: "pointer",
                  fontWeight: "500",
                  flex: 1,
                  transition: "all 0.2s ease",
                }}
                onClick={handleShow}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#007bff";
                  e.currentTarget.style.borderColor = "#007bff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.borderColor = "#007bff";
                }}
              >
                View
              </button>

              {/* Accept Button */}
              {item.status !== "Accepted" && item.status !== "Rejected" && (
                <button
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "transparent",
                    border: "1px solid #4CAF50",
                    borderRadius: "6px",
                    color: "#4CAF50",
                    cursor: "pointer",
                    fontWeight: "500",
                    flex: 1,
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#2E7D32";
                    e.currentTarget.style.borderColor = "#2E7D32";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.borderColor = "#4CAF50";
                  }}
                  onClick={() => applicationAccept(item._id)}
                >
                  Accept
                </button>
              )}

              {/* Reject Button */}
              {item.status !== "Accepted" && item.status !== "Rejected" && (
                <button
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "transparent",
                    borderRadius: "6px",
                    border: "1px solid #F44336",
                    color: "#F44336",
                    cursor: "pointer",
                    fontWeight: "500",
                    flex: 1,
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#C62828";
                    e.currentTarget.style.borderColor = "#C62828";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.borderColor = "#F44336";
                  }}
                  onClick={() => applicationReject(item._id)}
                >
                  Reject
                </button>
              )}

              {/* Send Email Button - only for Accepted or Rejected */}
              {(item.status === "Accepted" || item.status === "Rejected") && (
                <button
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "transparent",
                    borderRadius: "6px",
                    border: "1px solid #FFA000",
                    color: "#fff",
                    cursor: "pointer",
                    fontWeight: "500",
                    flex: 1,
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#FF8F00";
                    e.currentTarget.style.borderColor = "#FF8F00";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.borderColor = "#FFA000";
                  }}
                  onClick={() =>
                    notifyApplicant(
                      item.applicant.email,
                      item.applicant.name,
                      item.job.title,
                      item.status
                    )
                  }
                >
                  Notify
                </button>
              )}
            </div>

            <Modal show={show} onHide={handleClose} centered>
              <Modal.Header
                closeButton
                style={{
                  backgroundColor: "#1f1f1f",
                  borderBottom: "1px solid #333",
                }}
              >
                <Modal.Title style={{ color: "#ffffff", fontWeight: "600" }}>
                  Application Details
                </Modal.Title>
              </Modal.Header>

              <Modal.Body
                style={{ backgroundColor: "#1f1f1f", color: "#d0d0d0" }}
              >
                {/* Cover Letter Section */}
                <div style={{ marginBottom: "24px" }}>
                  <h5
                    style={{
                      color: "#007bff",
                      fontWeight: "600",
                      marginBottom: "8px",
                    }}
                  >
                    Cover Letter
                  </h5>
                  <p style={{ lineHeight: "1.6", whiteSpace: "pre-wrap" }}>
                    {item.coverLetter}
                  </p>
                </div>

                {/* Resume Download */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    marginTop: "16px",
                    marginBottom: "8px",
                  }}
                >
                  <a
                    href={`${baseURL}/uploads/${item.resume}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "#007bff",
                      textDecoration: "none",
                      fontWeight: "500",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      backgroundColor: "#292929",
                      padding: "10px 14px",
                      borderRadius: "6px",
                    }}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                      <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                    View Resume
                  </a>
                </div>
              </Modal.Body>

              <Modal.Footer
                style={{
                  backgroundColor: "#1f1f1f",
                  borderTop: "1px solid #333",
                }}
              >
                <Button onClick={handleClose} className="btn-primary">
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Applicant;
