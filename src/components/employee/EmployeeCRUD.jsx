import React, { useState } from "react";
import { Eye, Edit, Trash2, Plus } from "lucide-react";
import { Modal, Button, Form } from "react-bootstrap";

const mockJobs = [
  {
    id: 1,
    title: "Frontend Developer",
    department: "Engineering",
    salary: "₹8,00,000",
    location: "Bangalore",
    date: "2025-07-25",
    logo: "https://img.icons8.com/color/96/react-native.png",
  },
  {
    id: 2,
    title: "Backend Developer",
    department: "Engineering",
    salary: "₹9,00,000",
    location: "Chennai",
    date: "2025-07-20",
    logo: "https://img.icons8.com/color/96/nodejs.png",
  },
];

const EmployeeCRUD = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [preview, setPreview] = useState();
  const [imageType, setImageType] = useState(false);

  // setPreview(URL.createObjectURL(projectData.projectImg));

  return (
    <>
      <div style={styles.container}>
        <h2 style={styles.heading}>Manage Job Posts</h2>

        {/* Add & Search Section */}
        <div style={styles.topBar}>
          <button
            onClick={handleShow}
            style={styles.addButton}
            className="btn btn-success text-dark"
          >
            {/* <Plus size={12} style={{ marginRight: "6px" }} /> */}
            Add Job
          </button>
          <input
            type="text"
            placeholder="Search by title, department, or location"
            style={styles.searchInput}
          />
        </div>

        <hr />

        <div style={darkStyles.cardWrapper}>
          {mockJobs.map((job) => (
            <div key={job.id} style={darkStyles.card}>
              <img src={job.logo} alt="Logo" style={darkStyles.logo} />
              <div style={darkStyles.cardContent}>
                <h4 style={darkStyles.title}>{job.title}</h4>
                <p style={darkStyles.info}>
                  <strong>Dept:</strong> {job.department}
                </p>
                <p style={darkStyles.info}>
                  <strong>Salary:</strong> {job.salary}
                </p>
                <p style={darkStyles.info}>
                  <strong>Location:</strong> {job.location}
                </p>
                <p style={darkStyles.info}>
                  <strong>Posted:</strong> {job.date}
                </p>
                <div style={darkStyles.buttonGroup}>
                  <button
                    style={{ ...darkStyles.button, backgroundColor: "#1e88e5" }}
                  >
                    <Eye size={16} color="#fff" />
                  </button>
                  <button
                    style={{ ...darkStyles.button, backgroundColor: "#43a047" }}
                  >
                    <Edit size={16} color="#fff" />
                  </button>
                  <button
                    style={{ ...darkStyles.button, backgroundColor: "#e53935" }}
                  >
                    <Trash2 size={16} color="#fff" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Job Post</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="row">
            {/* Left: Company Logo Upload */}
            <div className="col-md-4 d-flex flex-column align-items-center">
              <label>
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                />
                <img
                  src={
                    preview
                      ? preview
                      : "https://cdn.dribbble.com/userupload/21869838/file/original-f703244db983a8e183191568045eb3eb.gif"
                  }
                  alt="Company Logo"
                  className="img-fluid border rounded"
                  style={{ width: "100%", height: "auto", cursor: "pointer" }}
                />
              </label>
              {!imageType ? (
                <p className="text-primary  mt-2 text-center">
                  Upload only jpeg, jpg, png formats
                </p>
              ) : null}
            </div>

            {/* Right: Form Fields */}
            <div className="col-md-8">
              <input
                type="text"
                className="form-control mt-2"
                placeholder="Job Title"
              />
              <textarea
                className="form-control mt-2"
                placeholder="Description"
                rows="3"
              />
              <input
                type="text"
                className="form-control mt-2"
                placeholder="Company"
              />
              <input
                type="text"
                className="form-control mt-2"
                placeholder="Location"
              />
              <input
                type="text"
                className="form-control mt-2"
                placeholder="Salary"
              />
              <input
                type="text"
                className="form-control mt-2"
                placeholder="Requirements"
              />
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const styles = {
  container: {
    padding: "30px",
    backgroundColor: "#121212",

    fontFamily: "Segoe UI, sans-serif",
    color: "#ffffff",
  },
  heading: {
    color: "#ffffff",
    marginBottom: "20px",
    textAlign: "center",
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
    flexWrap: "wrap",
    gap: "10px",
  },
  addButton: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    backgroundColor: "#1e88e5", // A nice blue
    color: "#fff",
    fontWeight: 600,
    border: "none",
    borderRadius: "8px",
    padding: "10px 20px",
    fontSize: "15px",
    boxShadow: "0 4px 8px rgba(30, 136, 229, 0.2)",
    transition: "all 0.2s ease-in-out",
    cursor: "pointer",
  },

  searchInput: {
    padding: "10px 16px",
    width: "100%",
    maxWidth: "400px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    outline: "none",
    backgroundColor: "#f9f9f9",
    transition: "border 0.2s ease, box-shadow 0.2s ease",
    color: "#333",
    fontFamily: "Arial, sans-serif",
  },
};
const darkStyles = {
  cardWrapper: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
   
    padding: "20px",
    backgroundColor: "#121212", // Dark background
  },
  card: {
    width: "300px",
    backgroundColor: "#1e1e1e", // Card background
    color: "#f5f5f5", // Light text
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.5)",
    overflow: "hidden",
    transition: "transform 0.2s ease",
  },
  logo: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    backgroundColor: "#333", // Placeholder background
  },
  cardContent: {
    padding: "15px",
  },
  title: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#ffffff",
  },
  info: {
    fontSize: "14px",
    marginBottom: "5px",
    color: "#cccccc",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "space-around", // evenly space buttons
    marginTop: "15px",
    gap: "10px", // optional: space between buttons
  },

  button: {
    flex: 1, // each button takes equal width
    border: "none",
    color: "#fff",
    padding: "10px 0", // vertical padding only
    borderRadius: "5px",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center", // center icon horizontally
    alignItems: "center", // center icon vertically
  },
};

export default EmployeeCRUD;
