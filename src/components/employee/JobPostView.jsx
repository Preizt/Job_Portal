import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { singlePostView } from "../../services/allAPI";
import baseURL from "../../services/baseURL";
import moment from "moment";

const JobPostView = () => {
  const [data, setData] = useState({});
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
    <div style={styles.container}>
      <div style={styles.innerWrapper}>
        <button
          className="btn"
          onClick={() => navigate(-1)}
          style={styles.backButton}
        >
          Back
        </button>
        <div style={styles.card}>
          {/* Company Info */}
          <div style={styles.header}>
            <div style={{ flex: 1 }}>
              <h1 style={styles.title}>{data.title}</h1>
              <h2 style={styles.company}>{data.company}</h2>
              <p style={styles.meta}>
                {data.location} <br />
                Posted {data.time ? moment(data.time).fromNow() : "Recently"}
              </p>
            </div>
            <img
              src={`${baseURL}/uploads/${data.image}`}
              alt="Company Logo"
              style={styles.logo}
            />
          </div>

          {/* Salary */}
          <h4>
            Estimated Salary:{" "}
            <span className="text-primary">{data.salary}</span> LPA
          </h4>

          <hr style={styles.divider} />

          {/* Job Description */}
          <div style={styles.section}>
            <h4>Job Description</h4>
            <p style={styles.text}>
              {data.description || "No description available."}
            </p>
          </div>

          <hr style={styles.divider} />

          {/* Requirements */}
          <h4>Requirements</h4>
          <p style={styles.text}>{data.requirements || "Not specified."}</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#0e0e0e",
    minHeight: "100vh",
    padding: "40px 20px",
    display: "flex",
    justifyContent: "center",
  },
  innerWrapper: {
    width: "100%",
    maxWidth: "850px",
  },
  backButton: {
    backgroundColor: "#333",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    marginBottom: "20px",
    fontSize: "16px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
    transition: "all 0.3s",
  },
  card: {
    backgroundColor: "#1b1b1b",
    padding: "36px",
    borderRadius: "16px",
    boxShadow: "0 8px 30px rgba(0,0,0,0.7)",
    color: "#f5f5f5",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "24px",
    marginBottom: "24px",
  },
  logo: {
    width: "150px",
    height: "150px",
    borderRadius: "16px",
    objectFit: "cover",
    backgroundColor: "#fff",
    padding: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
  },
  title: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "4px",
    color: "#ffffff",
  },
  company: {
    fontSize: "18px",
    color: "#c0c0c0",
    marginBottom: "4px",
  },
  meta: {
    fontSize: "14px",
    color: "#a0a0a0",
    lineHeight: "1.5",
  },
  divider: {
    borderColor: "#333",
    margin: "16px 0",
  },
  section: {
    marginBottom: "32px",
  },
  text: {
    fontSize: "16px",
    lineHeight: "1.6",
    color: "#dddddd",
  },
};

export default JobPostView;
