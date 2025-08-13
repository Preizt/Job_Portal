import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Tabs,
  Tab,
  Badge,
} from "react-bootstrap";
import { FiEdit, FiBookmark, FiSend } from "react-icons/fi";
import {
  getappliedJobs,
  getUserDetail,
  getUserSavedPost,
  removeSavedPost,
} from "../services/allAPI";
import baseURL from "../services/baseURL";
import Footer from "./Footer";
import Header from "./Header";
import { Trash2, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ApplicantProfile = () => {
  const [user, setUser] = useState({});
  const [appliedJobs, setAppliedJobs] = useState([]);
  const navigate = useNavigate();
  const [savedJobs, setSavedJobs] = useState([]);
  const [activeTab, setActiveTab] = useState("saved");

  const fetchSavedJobs = async () => {
    const token = sessionStorage.getItem("jwttoken");
    try {
      const reqHeader = { Authorization: `Bearer ${token}` };
      const response = await getUserSavedPost(reqHeader);
      if (response.status === 200) {
        setSavedJobs(response.data);
      } else {
        console.error("Failed to fetch saved jobs");
      }
    } catch (error) {
      console.error("Error fetching saved jobs:", error);
    }
  };

  useEffect(() => {
    fetchSavedJobs();
  }, []);

  const savedPostRemove = async (id) => {
    const token = sessionStorage.getItem("jwttoken");

    if (token) {
      try {
        const reqHeader = { Authorization: `Bearer ${token}` };

        const apiResponse = await removeSavedPost(reqHeader, id);

        if (apiResponse.status === 200) {
          toast.info("Unsaved");
          fetchSavedJobs();
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

  const getAppliedJobs = async () => {
    const token = sessionStorage.getItem("jwttoken");
    if (!token) {
      toast.warning("Please Login");
      navigate();
    }

    const reqHeader = {
      Authorization: `Bearer ${token}`,
    };

    try {
      const apiResponse = await getappliedJobs(reqHeader);
      if (apiResponse.status === 200) {
        setAppliedJobs(apiResponse.data);
      } else {
        toast.error("Failed to fetch applied jobs");
      }
    } catch (error) {
      console.error("Failed to fetch applied jobs:", error);
      toast.error("Something went wrong");
    }
  };

  const profileData = async () => {
    const token = sessionStorage.getItem("jwttoken");

    if (!token) {
      toast.warning("Please Login");
      navigate();
    }

    const reqHeader = {
      Authorization: `Bearer ${token}`,
    };

    const response = await getUserDetail(reqHeader);
    setUser(response.data);
  };

  useEffect(() => {
    profileData();
    getAppliedJobs();
  }, []);

  return (
    <>
      <Header />
      <Container className="py-5">
        <Row className="mb-4">
          {/* Profile & Stats - Show first on mobile, right on desktop */}
          <Col lg={4} md={12} className="order-1 order-lg-2">
            {/* Profile Card */}
            <Card className="border-0 shadow-sm mb-4">
  <Card.Body className="py-4 px-4">
    <div className="d-flex flex-column flex-md-row align-items-md-center">
      <div className="flex-grow-1 text-center text-md-start">
        <h3 className="mb-1">
          Welcome  <span className="text-primary">{user.name}</span> 
        </h3>
        <p className="text-muted mb-2">{user.email}</p>
        <Badge className="bg-success">{user.role}</Badge>
      </div>
    </div>
  </Card.Body>
</Card>


            {/* Stats Card */}
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-4">
                <h5 className="mb-4">Your Stats</h5>

                {/* Saved Jobs */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div>
                    <h6 className="mb-0">
                      <FiBookmark className="me-2 text-warning" />
                      Saved Jobs
                    </h6>
                    <small className="text-muted">Total saved</small>
                  </div>
                  <Badge bg="warning" text="dark" className="fs-5">
                    {savedJobs.length}
                  </Badge>
                </div>

                {/* Applied Jobs */}
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="mb-0">
                      <FiSend className="me-2 text-info" />
                      Applications
                    </h6>
                    <small className="text-muted">Total applied</small>
                  </div>
                  <Badge bg="info" className="fs-5">
                    {appliedJobs.length}
                  </Badge>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Tabs Section - Saved/Applied - Show second on mobile, left on desktop */}
          <Col lg={8} md={12} className="order-2 order-lg-1">
            <Card className="border-0 shadow-sm">
              <Card.Body>
                <Tabs
                  activeKey={activeTab}
                  onSelect={(k) => setActiveTab(k)}
                  className="mb-3"
                  justify
                >
                  {/* Saved Jobs */}
                  <Tab eventKey="saved" title="Saved Jobs">
                    {savedJobs.length > 0 ? (
                      savedJobs.map((job) => (
                        <Card
                          key={job._id}
                          className="mb-4 border-0 rounded-4 shadow-sm job-card p-3"
                        >
                          <Row className="align-items-center">
                            <Col md={2} className="text-center">
                              <img
                                src={`${baseURL}/uploads/${job.image}`}
                                alt={job.company}
                                className="img-fluid rounded border"
                                style={{
                                  width: "80px",
                                  height: "80px",
                                  objectFit: "cover",
                                }}
                              />
                            </Col>

                            <Col md={8}>
                              <h5 className="mb-1">{job.title}</h5>
                              <p className="mb-0 text-muted fw-medium">
                                {job.company} • {job.location}
                              </p>
                              <p
                                className="text-muted mt-2 mb-1 small"
                                style={{ lineHeight: 1.5 }}
                              >
                                {job.description.length > 150
                                  ? job.description.slice(0, 150) + "..."
                                  : job.description}
                              </p>
                            </Col>

                            <Col
                              md={2}
                              className="text-md-end mt-3 mt-md-0 d-flex flex-column gap-2"
                            >
                              <button
                                className="btn btn-outline-primary d-flex align-items-center justify-content-center gap-2"
                                onClick={() =>
                                  navigate(`/applicantsinglepost/${job._id}`)
                                }
                              >
                                <Eye size={18} />
                              </button>

                              <button
                                className="btn btn-outline-danger d-flex align-items-center justify-content-center gap-2"
                                onClick={() => savedPostRemove(job._id)}
                              >
                                <Trash2 size={18} />
                              </button>
                            </Col>
                          </Row>
                        </Card>
                      ))
                    ) : (
                      <div className="text-center text-muted py-5">
                        <p>No saved jobs yet.</p>
                      </div>
                    )}
                  </Tab>

                  {/* Applied Jobs */}
                  <Tab eventKey="applied" title="Applied Jobs">
                    {appliedJobs.length > 0 ? (
                      appliedJobs.map((application) => (
                        <Card
                          key={application._id}
                          className="mb-4 border-0 rounded-4 shadow-sm job-card p-3"
                        >
                          <Row className="align-items-center">
                            <Col md={2} className="text-center">
                              <img
                                src={`${baseURL}/uploads/${application.job.image}`}
                                alt={application.job.company}
                                className="img-fluid rounded border"
                                style={{
                                  width: "80px",
                                  height: "80px",
                                  objectFit: "cover",
                                }}
                              />
                            </Col>

                            <Col md={8}>
                              <h5 className="mb-1">{application.job.title}</h5>
                              <p className="mb-0 text-muted fw-medium">
                                {application.job.company} •{" "}
                                {application.job.location}
                              </p>
                              <p className="text-muted mt-2 mb-1 small">
                                {application.job.description?.slice(0, 150)}
                              </p>
                              <p className="mb-0">
                                <strong>Status:</strong>{" "}
                                <span
                                  style={{
                                    color:
                                      application.status === "Accepted"
                                        ? "#4CAF50"
                                        : application.status === "Rejected"
                                        ? "#F44336"
                                        : "#FFA000",
                                  }}
                                > 
                                  {application.status}
                                </span>
                              </p>
                            </Col>

                            <Col md={2} className="text-end">
                              <Button
                                variant="outline-primary"
                                onClick={() =>
                                  navigate(
                                    `/applicantsinglepost/${application.job._id}`
                                  )
                                }
                              >
                                View
                              </Button>
                            </Col>
                          </Row>
                        </Card>
                      ))
                    ) : (
                      <div className="text-center text-muted py-5">
                        <p>No applied jobs yet.</p>
                      </div>
                    )}
                  </Tab>
                </Tabs>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default ApplicantProfile;
