import React from "react";
import { Col, FloatingLabel, Row, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const Auth = ({ fromRegisterPage }) => {
  return (
    <div
      className="d-flex justify-content-center align-items-center bg-black"
      style={{ minHeight: "100vh" }}
    >
      <div className="container w-75 bg-black p-4 p-md-5 rounded-4 shadow-lg ">
        <Row className="g-4 align-items-center">
          {/* Left Side Image or Illustration */}
          <Col md={6} className="d-none d-md-block">
            <img
              src="https://payload.cargocollective.com/1/0/25622/10684946/ZDEPTHx300.gif"
              className="img-fluid rounded-3"
              alt="login illustration"
            />
          </Col>

          {/* Right Side Form */}
          <Col md={6}>
            <Link to={"/"} style={{ textDecoration: "none" }}>
              <h1 className="fw-bold text-white">NexHire</h1>
            </Link>

            <h4 className="mt-3 fw-semibold text-white-50">
              Sign{" "}
              <span className="text-success">
                {fromRegisterPage ? "Up" : "In"}
              </span>{" "}
              to your account
            </h4>

            <Form className="mt-4">
              {/* Username (for Register) */}
              {fromRegisterPage && (
                <FloatingLabel
                  controlId="floatingUsername"
                  label="Username"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    className="bg-secondary-subtle text-white border-0"
                  />
                </FloatingLabel>
              )}

              {/* Email */}
              <FloatingLabel
                controlId="floatingEmail"
                label="Email address"
                className="mb-3"
              >
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  className="bg-secondary-subtle text-white border-0"
                />
              </FloatingLabel>

              {/* Password */}
              <FloatingLabel
                controlId="floatingPassword"
                label="Password"
                className="mb-3"
              >
                <Form.Control
                  type="password"
                  placeholder="Password"
                  className="bg-secondary-subtle text-white border-0"
                />
              </FloatingLabel>

              {/* Button */}
              <button
                type="submit"
                className="btn btn-success mt-3 w-100 fw-semibold rounded-pill"
              >
                {fromRegisterPage ? "Register" : "Login"}
              </button>

              {/* Switch Auth Link */}
              <p className="mt-4 text-center text-white-50">
                {fromRegisterPage ? (
                  <>
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="text-success text-decoration-none"
                    >
                      Login
                    </Link>
                  </>
                ) : (
                  <>
                    New here?{" "}
                    <Link
                      to="/register"
                      className="text-success text-decoration-none"
                    >
                      Register
                    </Link>
                  </>
                )}
              </p>
            </Form>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Auth;
