import React, { useState } from "react";

const EmployeeCRUD = () => {
  const [jobs, setJobs] = useState([
    { id: 1, title: "Frontend Developer", location: "Remote" },
    { id: 2, title: "Backend Engineer", location: "Bangalore" },
  ]);
  const [formData, setFormData] = useState({ title: "", location: "" });
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    if (!formData.title || !formData.location) return;
    const newJob = { id: Date.now(), ...formData };
    setJobs([...jobs, newJob]);
    setFormData({ title: "", location: "" });
  };

  const handleDelete = (id) => {
    setJobs(jobs.filter((job) => job.id !== id));
  };

  const handleEdit = (job) => {
    setFormData({ title: job.title, location: job.location });
    setEditId(job.id);
  };

  const handleUpdate = () => {
    setJobs(jobs.map((job) => (job.id === editId ? { ...job, ...formData } : job)));
    setEditId(null);
    setFormData({ title: "", location: "" });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Manage Your Job Listings</h2>
      <div style={styles.grid}>
        {/* Form Section */}
        <div style={styles.formBox}>
          <h4 style={styles.subHeading}>{editId ? "Edit Job" : "Add New Job"}</h4>
          <input
            type="text"
            name="title"
            placeholder="Job Title"
            value={formData.title}
            onChange={handleChange}
            style={styles.input}
          />
          <input
            type="text"
            name="location"
            placeholder="Job Location"
            value={formData.location}
            onChange={handleChange}
            style={styles.input}
          />
          {editId ? (
            <button onClick={handleUpdate} style={{ ...styles.button, backgroundColor: "#4CAF50" }}>
              Update Job
            </button>
          ) : (
            <button onClick={handleAdd} style={{ ...styles.button, backgroundColor: "#007BFF" }}>
              Add Job
            </button>
          )}
        </div>

        {/* Job List Section */}
        <div style={styles.jobListBox}>
          <h4 style={styles.subHeading}>Your Posted Jobs</h4>
          {jobs.length === 0 ? (
            <p style={{ color: "#888" }}>No job posts yet.</p>
          ) : (
            <ul style={styles.list}>
              {jobs.map((job) => (
                <li key={job.id} style={styles.jobCard}>
                  <div>
                    <strong>{job.title}</strong> <br />
                    <span style={styles.location}>{job.location}</span>
                  </div>
                  <div>
                    <button onClick={() => handleEdit(job)} style={styles.editBtn}>
                      ✏️
                    </button>
                    <button onClick={() => handleDelete(job.id)} style={styles.deleteBtn}>
                      🗑️
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    maxWidth: "1100px",
    margin: "30px auto",
    padding: "30px",
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0 0 20px rgba(0,0,0,0.05)",
    fontFamily: "Segoe UI, sans-serif",
  },
  heading: {
    textAlign: "center",
    marginBottom: "30px",
    color: "#333",
    fontSize: "28px",
    fontWeight: "600",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "40px",
  },
  formBox: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    borderRight: "1px solid #eee",
    paddingRight: "20px",
  },
  jobListBox: {
    paddingLeft: "20px",
  },
  subHeading: {
    fontSize: "20px",
    marginBottom: "10px",
    color: "#444",
    fontWeight: "500",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    outline: "none",
  },
  button: {
    padding: "10px",
    color: "#fff",
    border: "none",
    fontSize: "16px",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background 0.3s ease",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  jobCard: {
    backgroundColor: "#f8f9fa",
    padding: "15px 20px",
    marginBottom: "15px",
    borderRadius: "8px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
  },
  location: {
    color: "#555",
    fontSize: "14px",
  },
  editBtn: {
    backgroundColor: "#FFC107",
    border: "none",
    padding: "8px 10px",
    borderRadius: "5px",
    color: "#fff",
    marginRight: "8px",
    cursor: "pointer",
  },
  deleteBtn: {
    backgroundColor: "#DC3545",
    border: "none",
    padding: "8px 10px",
    borderRadius: "5px",
    color: "#fff",
    cursor: "pointer",
  },
};

export default EmployeeCRUD;
