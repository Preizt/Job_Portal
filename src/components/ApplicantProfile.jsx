import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Card, Button, Row, Col } from "react-bootstrap";

const ApplicantProfile = () => {
  return (
    <>
      <Header />

      <div className="bg-black text-white min-vh-100 py-5">
        <div className="container">
          {/* Profile Section */}
          <div className="text-center mb-5">
            <div className="position-relative d-inline-block">
              <img
                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                alt="Profile"
                className="rounded-circle"
                width={120}
                height={120}
              />
              <Button
                variant="light"
                size="sm"
                className="position-absolute bottom-0 end-0 rounded-pill"
              >
                Edit
              </Button>
            </div>
            <h3 className="mt-3">John Doe</h3>
            <p className="text-secondary">johndoe@example.com</p>
          </div>

          {/* Applications List */}
          <h4 className="mb-4">Your Applications</h4>
          <Row className="g-4">
            {[1].map((id) => (
              <Col md={6} lg={4} key={id}>
                <Card className="h-100 bg-black text-white border border-secondary rounded-4 p-3 shadow-sm">
                  <Card.Body>
                    <div className="d-flex flex-column gap-2">
                      <div>
                        <h5 className="fw-bold mb-1">Frontend Developer</h5>
                        <p className="text-muted mb-0">
                          at <span className="text-white">TechNova</span>
                        </p>
                      </div>

                      <div className="mt-2">
                        <p className="mb-1">
                          <i className="fa-regular fa-calendar me-2"></i>
                          <small>
                            Applied on:{" "}
                            <span className="text-light">2025-07-24</span>
                          </small>
                        </p>
                        <p className="mb-0">
                          <i className="fa-regular fa-clock me-2"></i>
                          <small>
                            Status:{" "}
                            <span className="text-warning fw-semibold">
                              Pending
                            </span>
                          </small>
                        </p>
                      </div>

                      <div className="mt-3">
                        <Button
                          variant="outline-light"
                          className="rounded-pill w-100"
                        >
                          View Application
                        </Button>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ApplicantProfile;
