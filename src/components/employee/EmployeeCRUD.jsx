import React, { useContext, useEffect, useState } from "react";
import { Eye, Edit, Trash2, Plus } from "lucide-react";
import { Modal, Button, Form } from "react-bootstrap";
import EditJobPost from "./EditJobPost";
import { toast } from "react-toastify";
import { deletePost, getAllJobPosts, postJob } from "../../services/allAPI";
import baseURL from "../../services/baseURL";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { editJobContext } from "../../context/JobEditContext";

const EmployeeCRUD = () => {
  const { dataresponse, setDataResponse } = useContext(editJobContext);
  const navigate = useNavigate();

  const [searchKey, setSearchKey] = useState("");
  const [jobs, setJob] = useState([]);
  const [preview, setPreview] = useState();
  const [data, setData] = useState({
    image: "",
    title: "",
    description: "",
    company: "",
    location: "",
    salary: "",
    requirements: "",
  });
  console.log(searchKey);

  useEffect(() => {
    if (data.image) {
      if (
        data.image.type == "image/jpeg" ||
        data.image.type == "image/png" ||
        data.image.type == "image/jpg"
      ) {
        setPreview(URL.createObjectURL(data.image));
        setImageType(false);
      } else {
        setPreview("");
        setImageType(true);
        toast.warning("Invalid File");
      }
    }
  }, [data.image]);

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const [imageType, setImageType] = useState(false);

  const addJob = async () => {
    if (
      data.image &&
      data.title &&
      data.company &&
      data.salary &&
      data.description &&
      data.requirements &&
      data.location
    ) {
      try {
        const payload = new FormData();

        payload.append("image", data.image);
        payload.append("title", data.title);
        payload.append("description", data.description);
        payload.append("salary", data.salary);
        payload.append("company", data.company);
        payload.append("requirements", data.requirements);
        payload.append("location", data.location);

        const token = sessionStorage.getItem("jwttoken");
        const reqHeader = { Authorization: `Bearer ${token}` };
        const apiResponse = await postJob(payload, reqHeader);
        if (apiResponse.status === 201) {
          toast.success("Job Posted");
          setShow(false);

          setData({
            image: "",
            title: "",
            description: "",
            company: "",
            location: "",
            salary: "",
            requirement: "",
          });

          setPreview(null);
          getAllPosts();
        } else {
          toast.error("Something went wrong!");
        }
      } catch (error) {
        console.log(error);

        toast.error("Server error occurred");
      }
    } else {
      toast.warning(
        "Please fill in all required fields and upload a valid image."
      );
    }
  };

  const handleClose = () => {
    setShow(false);
    setData({
      image: "",
      title: "",
      description: "",
      company: "",
      location: "",
      salary: "",
      requirement: "",
    });

    setPreview(null);
  };

  const getAllPosts = async () => {
    const token = sessionStorage.getItem("jwttoken");

    if (token) {
      try {
        const reqHeader = { Authorization: `Bearer ${token}` };

        // console.log(reqHeader);

        const apiResponse = await getAllJobPosts(reqHeader, searchKey);

        if (apiResponse.status === 200) {
          setJob(apiResponse.data);
          // console.log(apiResponse);
        } else {
          alert(apiResponse.data);
        }
      } catch (err) {
        alert(err.message || "Something went wrong while fetching jobs");
      }
    } else {
      toast.error("Please login first");
    }
  };

  useEffect(() => {
    getAllPosts();
  }, [searchKey, dataresponse]);

  const onDeleteBtn = async (id) => {
    const token = sessionStorage.getItem("jwttoken");

    try {
      const reqHeader = { Authorization: `Bearer ${token}` };
      const apiResponse = await deletePost(reqHeader, id);

      if (apiResponse.status == 200) {
        getAllPosts();
        toast.success("Job Post Removed");
      } else {
        toast.error("Something went Wrong");
      }
    } catch (error) {
      toast.danger(error);
    }
  };

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
            placeholder="Search by title"
            style={styles.searchInput}
            onChange={(e) => setSearchKey(e.target.value)}
          />
        </div>

        <hr />

        <div style={darkStyles.cardWrapper}>
          {[...jobs].reverse().map((job, index) => (
            <div key={index} style={{ position: "relative" }}>
              {/* The actual card */}
              <div
                style={{
                  ...darkStyles.card,
                  paddingTop: "30px",
                  position: "relative",
                }}
              >
                {/* Time Badge (absolute positioning for better control) */}
                <span
                  style={{
                    position: "absolute",
                    top: "5px",
                    right: "10px",
                    fontSize: "12px",
                    color: "#bbb",
                    background: "rgba(0,0,0,0.5)",
                    padding: "4px 8px",
                    borderRadius: "12px",
                  }}
                >
                  Posted {moment(job.time).fromNow()}
                </span>

                {/* Company Logo */}
                <div style={{ textAlign: "center", marginBottom: "10px" }}>
                  <img
                    src={`${baseURL}/uploads/${job.image}`}
                    alt="Logo"
                    style={darkStyles.logo}
                  />
                </div>

                {/* Card Content */}
                <div style={darkStyles.cardContent}>
                  <h4 style={darkStyles.title}>{job.title}</h4>
                  <p style={darkStyles.info}>
                    <strong>Company:</strong> {job.company}
                  </p>
                  <p style={darkStyles.info}>
                    <strong>Salary:</strong> {job.salary} LPA
                  </p>
                  <p style={darkStyles.info}>
                    <strong>Location:</strong> {job.location}
                  </p>

                  {/* Button Group */}
                  <div
                    style={{
                      ...darkStyles.buttonGroup,
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "10px",
                      marginTop: "15px",
                    }}
                  >
                    <button
                      style={{
                        ...darkStyles.button,
                        backgroundColor: "#1e88e5",
                      }}
                      onClick={() =>
                        navigate(`/employer/singlejobpost/${job._id}`)
                      }
                    >
                      <Eye size={16} color="#fff" />
                    </button>

                    <EditJobPost job={job} />

                    <button
                      style={{
                        ...darkStyles.button,
                        backgroundColor: "#e53935",
                      }}
                      onClick={() => {
                        onDeleteBtn(job._id);
                      }}
                    >
                      <Trash2 size={16} color="#fff" />
                    </button>
                  </div>
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
          <div className="row g-4">
            <div className="col-md-4 text-center">
              <label style={{ cursor: "pointer" }}>
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    setData({ ...data, image: e.target.files[0] });
                  }}
                />
                <img
                  src={
                    preview
                      ? preview
                      : "https://cdn.dribbble.com/userupload/21869838/file/original-f703244db983a8e183191568045eb3eb.gif"
                  }
                  alt="Company Logo"
                  className="img-fluid border rounded"
                  style={{
                    maxWidth: "200px",
                    height: "auto",
                    objectFit: "contain",
                  }}
                />
              </label>
              {imageType && (
                <p className="text-danger mt-2 text-center">
                  Invalid image format. Only jpeg, jpg, png allowed.
                </p>
              )}
            </div>

            <div className="col-md-8">
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Job Title"
                onChange={(e) => setData({ ...data, title: e.target.value })}
              />
              <textarea
                className="form-control mb-2"
                placeholder="Description"
                rows="3"
                onChange={(e) =>
                  setData({ ...data, description: e.target.value })
                }
              />
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Company"
                onChange={(e) => setData({ ...data, company: e.target.value })}
              />
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Location"
                onChange={(e) => setData({ ...data, location: e.target.value })}
              />
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Salary"
                onChange={(e) => setData({ ...data, salary: e.target.value })}
              />
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Requirements"
                onChange={(e) =>
                  setData({ ...data, requirements: e.target.value })
                }
              />
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addJob}>
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
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: "10px",
    marginBottom: "30px",
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
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "30px",
    padding: "20px",
    backgroundColor: "#121212",
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
