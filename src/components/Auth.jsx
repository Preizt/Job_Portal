import React, { useState } from "react";
import { Col, FloatingLabel, Row, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser, registerUser } from "../services/allAPI";

const Auth = ({ fromRegisterPage }) => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    role: "",
    email: "",
    password: "",
  });

  const onBtnClick = async (e) => {
    e.preventDefault();

    if (fromRegisterPage) {
      const { name, role, email, password } = data;
      if (name && role && email && password) {
        let apiResponse = await registerUser(data);
        // console.log(apiResponse);

        if (apiResponse.status == 201) {
          toast.success("Registration Succesfull");
          navigate("/login");
        } else {
          if (apiResponse.status == 409) {
            toast.warning("User Already Exist");
          }
        }
      } else {
        toast.error("Fill the form");
      }
    } else {
      const { email, password } = data;
      if (email && password) {
        const apiResponse = await loginUser(data);
      //  console.log(apiResponse.data.UserDetail.role);
       
        if (apiResponse.status == 200) {
          sessionStorage.setItem("jwttoken", apiResponse.data.jwttoken);
          sessionStorage.setItem("role", apiResponse.data.UserDetail.role);
          sessionStorage.setItem("name",apiResponse.data.UserDetail.name)
          

          if (apiResponse.data.UserDetail.role == "applicant") {
            navigate("/");
            toast.success("Login Successfull");
          } else {
            navigate("/employer/dashboard");
            toast.success("Employer Login Successfull");
          }
        } else {
          toast.warning("Invalid Credentials");
        }
      } else {
        toast.warning("Fill the form");
      }
    }
  };

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

            <Form className="mt-4" autoComplete="off">
              {/* Username (for Register) */}
              {fromRegisterPage && (
                <>
                  <FloatingLabel
                    controlId="floatingUsername"
                    label="Username"
                    className="mb-3"
                  >
                    <Form.Control
                      type="text"
                      placeholder="Enter username"
                      className=" text-black border-0"
                      onChange={(e) => {
                        setData({ ...data, name: e.target.value });
                      }}
                    />
                  </FloatingLabel>

                  {/* Role Selection */}
                  <FloatingLabel
                    controlId="floatingRole"
                    label="Select Role"
                    className="mb-3"
                  >
                    <Form.Select
                      name="role"
                      className=""
                      required
                      onChange={(e) => {
                        setData({ ...data, role: e.target.value });
                      }}
                    >
                      <option value="" disabled hidden>
                        Select Role
                      </option>
                      <option value="applicant">Applicant</option>
                      <option value="employer">Employer</option>
                    </Form.Select>
                  </FloatingLabel>
                </>
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
                  className=""
                  onChange={(e) => {
                    setData({ ...data, email: e.target.value });
                  }}
                />
              </FloatingLabel>

              {/* Password */}
              <FloatingLabel
                controlId="floatingPassword"
                label="Password"
                className="mb-3"
                onChange={(e) => {
                  setData({ ...data, password: e.target.value });
                }}
              >
                <Form.Control
                  type="password"
                  placeholder="Password"
                  className=""
                />
              </FloatingLabel>

              {/* Button */}
              <button
                type="submit"
                className="btn btn-success mt-3 w-100 fw-semibold rounded-pill"
                onClick={onBtnClick}
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
