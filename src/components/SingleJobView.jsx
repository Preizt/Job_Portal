import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Bookmark } from "lucide-react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";


const SingleJobView = () => {
  


  const job = {
    title: "Frontend Developer",
    company: "TechNova Solutions",
    location: "Bangalore, India",
    type: "Full-Time",
    posted: "3 days ago",
    salary: "₹8 - ₹12 LPA",
    logo: "https://cdn-icons-png.flaticon.com/512/5968/5968267.png", // Replace with actual logo
    description:
      "We are looking for a skilled Frontend Developer to join our team. You will work on modern web applications using React, JavaScript, and CSS. You should be passionate about UI/UX and responsive design.",
    requirements: [
      "3+ years experience with React.js",
      "Strong knowledge of HTML, CSS, JavaScript",
      "Familiarity with REST APIs",
      "Experience with Git and Agile workflows",
    ],
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);





  return (
    <>
    

      <div style={styles.container}>
        <div style={styles.card}>
          {/* Logo and Save button */}
          <div style={styles.cardTop}>
            <img src={job.logo} alt="Company Logo" style={styles.logo} />
            <button style={styles.saveBtn}>
              <Bookmark size={20} style={{ marginRight: "0px" }} />
            </button>
          </div>

          <h1 style={styles.title}>{job.title}</h1>
          <p style={styles.company}>
            <strong>{job.company}</strong>
          </p>
          <p style={styles.meta}>
            📍 {job.location} | 🕒 {job.type} | 📅 {job.posted}
          </p>
          <p style={styles.salary}>💰 {job.salary}</p>

          <hr style={styles.divider} />

          <h3 style={styles.subheading}>Job Description</h3>
          <p style={styles.text}>{job.description}</p>

          <h3 style={styles.subheading}>Requirements</h3>
          <ul>
            {job.requirements.map((req, idx) => (
              <li key={idx} style={styles.text}>
                • {req}
              </li>
            ))}
          </ul>

          <button style={styles.applyBtn} onClick={handleShow}>
            Apply Now
          </button>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Job Apply Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            <div>
              <label>Job Title</label>
              <input
                type="text"
                name="job"
                placeholder="Job Title"
                className="form-control"
              />
            </div>

            <div>
              <label>Applicant Name</label>
              <input
                type="text"
                name="applicant"
                placeholder="Your Name"
                className="form-control"
              />
            </div>

            <div>
              <label>Cover Letter</label>
              <textarea
                name="coverLetter"
                rows="4"
                placeholder="Write your cover letter..."
                className="form-control"
              ></textarea>
            </div>

            <div>
              <label>Resume</label>
              <input
                type="file"
                name="resume"
                accept=".pdf"
                className="form-control"
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Apply
          </Button>
        </Modal.Footer>
      </Modal>

      
    </>
  );
};

const styles = {
  container: {
    backgroundColor: "#000",
    minHeight: "100vh",
    padding: "40px 20px",
    color: "#fff",
    display: "flex",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#2c2c2c",
    padding: "30px",
    borderRadius: "12px",
    maxWidth: "800px",
    width: "100%",
    position: "relative",
  },
  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  logo: {
    width: "60px",
    height: "60px",
    objectFit: "cover",
    borderRadius: "8px",
    backgroundColor: "#fff",
  },
  saveBtn: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "transparent",
    border: "1px solid #007bff",
    color: "#007bff",
    padding: "6px 12px",
    borderRadius: "6px",
    fontSize: "14px",
    cursor: "pointer",
    transition: "all 0.3s",
  },
  title: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  company: {
    fontSize: "18px",
    color: "#ccc",
    marginBottom: "5px",
  },
  meta: {
    fontSize: "14px",
    color: "#aaa",
    marginBottom: "10px",
  },
  salary: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#00bcd4",
  },
  divider: {
    borderColor: "#333",
    margin: "20px 0",
  },
  subheading: {
    fontSize: "20px",
    marginBottom: "8px",
    color: "#fff",
  },
  text: {
    fontSize: "15px",
    color: "#ddd",
    marginBottom: "8px",
  },
  applyBtn: {
    marginTop: "25px",
    padding: "12px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
};

export default SingleJobView;
