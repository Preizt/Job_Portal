import React, { useEffect, useState } from "react";
import { Edit } from "lucide-react";
import { Button, Modal } from "react-bootstrap";
import baseURL from "../../services/baseURL";
import { toast } from "react-toastify";
import { updateJob } from "../../services/allAPI";


const EditJobPost = ({ job }) => {

  
  const [data, setData] = useState({
    title: "",
    description: "",
    company: "",
    location: "",
    salary: "",
    requirements: "",
    image: null,
  });

  const jobId = job?._id;
  
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (job) {
      setData({
        title: job.title || "",
        description: job.description || "",
        company: job.company || "",
        location: job.location || "",
        salary: job.salary || "",
        requirements: job.requirements || "", // ✅ plural, consistent
        image: job.image || null,
      });
    }
  }, [job]);

   const [preview, setPreview] = useState();

   useEffect(() => {
    if (data.image) {
      if (
        data.image.type == "image/png" ||
        data.image.type == "image/jpg" ||
        data.image.type == "image/jpeg"
      ) {
        setPreview(URL.createObjectURL(data.image));
      }
    }
  }, [data.image]);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  
  

   const updatingJobPost = async () => {
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
          const reqHeader = { "Authorization": `Bearer ${token}` };
          const apiResponse = await updateJob(payload, reqHeader,jobId);
          if (apiResponse.status === 200) {
            toast.success("Post Updated");
            setShow(false);
  
          
  
            setPreview(null);
            
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
  

  return (
    <>
      <button
        onClick={handleShow}
        style={{ ...darkStyles.button, backgroundColor: "#43a047" }}
      >
        <Edit size={16} color="#fff" />
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Job Post</Modal.Title>
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
                  onChange={(e) =>
                    setData({ ...data, image: e.target.files[0] })
                  }
                />
                <img
                  src={preview ? preview : `${baseURL}/uploads/${data.image}`}
                  alt=""
                  className="img-fluid mt-5 ms-3"
                />
              </label>
            </div>

            {/* Right: Form Fields */}
            <div className="col-md-8">
              <input
                type="text"
                className="form-control mt-2"
                placeholder="Job Title"
                value={data.title}
                onChange={(e) =>
                  setData({ ...data, title: e.target.value })
                }
              />
              <textarea
                className="form-control mt-2"
                placeholder="Description"
                rows="3"
                value={data.description}
                onChange={(e) =>
                  setData({ ...data, description: e.target.value })
                }
              />
              <input
                type="text"
                className="form-control mt-2"
                placeholder="Company"
                value={data.company}
                onChange={(e) =>
                  setData({ ...data, company: e.target.value })
                }
              />
              <input
                type="text"
                className="form-control mt-2"
                placeholder="Location"
                value={data.location}
                onChange={(e) =>
                  setData({ ...data, location: e.target.value })
                }
              />
              <input
                type="text"
                className="form-control mt-2"
                placeholder="Salary"
                value={data.salary}
                onChange={(e) =>
                  setData({ ...data, salary: e.target.value })
                }
              />
              <input
                type="text"
                className="form-control mt-2"
                placeholder="Requirements"
                value={data.requirements}
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
          <Button
            variant="primary"
             onClick={updatingJobPost}
          >
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const darkStyles = {
  button: {
    flex: 1,
    border: "none",
    color: "#fff",
    padding: "10px 0",
    borderRadius: "5px",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

export default EditJobPost;
