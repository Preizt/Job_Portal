import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button, Form } from "react-bootstrap";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getApplicantAllPost } from "../services/allAPI";
import baseURL from "../services/baseURL";
import moment from "moment";
import { MapPin, DollarSign, Clock } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AllJobs = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState({});

  const applicantAllJobs = async () => {
    try {
      const apiResponse = await getApplicantAllPost();
      if (apiResponse?.status === 200) {
        setJobs(apiResponse.data);
      } else {
        toast.warning("Unexpected response status");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  useEffect(() => {
    applicantAllJobs();
  }, []);

  return (
    <>
      <Header />

      <div className="bg-light min-vh-100 py-5">
        <div className="container">
          <h1 className="mb-4 fw-bold text-center text-dark">
            Start Your Future with NexHire
          </h1>

          {/* Search Bar Only */}
          <div className="mb-4">
            <Form>
              <Form.Control
                type="text"
                placeholder=" Search by job title"
                className="rounded-pill px-4 py-2 shadow-sm"
              />
            </Form>
          </div>

          {/* Job Cards */}

          <Row className="g-4">
            {jobs.length > 0 ? (
              jobs
                .slice()
                .reverse()
                .map((job) => (
                  <Col md={6} lg={4} key={job._id}>
                    <Card className="shadow-sm border-0 rounded-4 h-100 job-card p-4">
                      {/* Logo and Company Info */}
                      <div className="d-flex align-items-center mb-3">
                        <img
                          src={`${baseURL}/uploads/${job.image}`}
                          alt={job.company}
                          className="me-3"
                          style={{
                            width: "64px",
                            height: "64px",
                            objectFit: "cover",
                            borderRadius: "12px",
                            border: "1px solid #e0e0e0",
                          }}
                          onError={(e) =>
                            (e.target.src =
                              "https://cdn-icons-png.flaticon.com/512/1995/1995574.png")
                          }
                        />
                        <div>
                          <h6 className="mb-1  text-dark">{job.title}</h6>
                          <p className="mb-0 text-secondary small">
                            {job.company}
                          </p>
                        </div>
                      </div>

                      {/* Job Info */}
                      <div
                        className="text-secondary mb-3"
                        style={{ fontSize: "0.95rem" }}
                      >
                        <div className="d-flex align-items-center mb-2">
                          <MapPin size={16} className="me-2 text-primary" />
                          {job.location}
                        </div>
                        <div className="d-flex align-items-center mb-2">
                          <DollarSign size={16} className="me-2 text-success" />
                          {job.salary}
                          <span className="text-danger ms-1"> LPA</span>
                        </div>
                        <div className="d-flex align-items-center mb-2">
                          <Clock size={16} className="me-2 text-warning" />
                          <span>{moment(job.time).fromNow()}</span>
                        </div>
                        {job.type && (
                          <span className="badge bg-light text-dark border mt-2 px-3 py-1 rounded-pill">
                            {job.type}
                          </span>
                        )}
                      </div>

                      {/* Button */}
                      <Button
                        variant="dark"
                        className="w-100 rounded-pill fw-semibold mt-auto"
                        onClick={() =>
                          navigate(`/applicantsinglepost/${job._id}`)
                        }
                      >
                        View Details
                      </Button>
                    </Card>
                  </Col>
                ))
            ) : (
              <p className="text-muted text-center">No jobs available.</p>
            )}
          </Row>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default AllJobs;
